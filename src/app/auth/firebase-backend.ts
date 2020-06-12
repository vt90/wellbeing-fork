import {AuthBackend, BackendError} from './auth-backend';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {switchMap, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Observable, of} from 'rxjs';

interface FirebaseLoginResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

interface FirebaseEmailResponse {
  email: string;
}

interface FirebaseLookupResponseUsers {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
}

interface FirebaseLookupResponse {
  kind: string;
  users: FirebaseLookupResponseUsers[];
}

interface UserData {
  userId: string;
  role: string;
}

export class FirebaseBackend implements AuthBackend {

  constructor(private httpClient: HttpClient) {
    this._key = `?key=${environment.firebaseApiKey}`;
  }
  private _endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  //private _db = 'https://auth-template-4d292.firebaseio.com/';
  private _db ='https://wellbeing-8bf92.firebaseio.com/';
  private readonly _key: string;

  private static createUserFromFirebaseResponse(data: FirebaseLoginResponse, role: string) {
    return new User(data.localId,
      data.refreshToken,
      data.idToken,
      role,
      new Date(Date.now() + (+data.expiresIn) * 1000));
  }

  /**
   * Login Sequence:
   *
   * 1. Call the authentication endpoint for logging in with email
   * 2. This returns the user data if successful. Use that to look up whether that user has verified his email
   * 3. If not, throw an error. If yes, retrieve the user from the the database, where the roles are stored.
   * 4. Check that the requested login role is available. If not, throw an error that there is a role mismatch.
   *
   */
  login(email: string, password: string, role: string) {
    let user: User = null;
    return this.httpClient
      .post<FirebaseLoginResponse>(`${this._endpoint}signInWithPassword${this._key}`,
        {email, password, returnSecureToken: true})
      .pipe(
        switchMap<FirebaseLoginResponse, Observable<FirebaseLookupResponse>>(
          (loginData) => {
            user = FirebaseBackend.createUserFromFirebaseResponse(loginData, role);
            return this.httpClient
              .post<FirebaseLookupResponse>(`${this._endpoint}lookup${this._key}`,
                {idToken: loginData.idToken});
          }),
        switchMap(responseData => {
          if (!responseData.users[0].emailVerified) {
            throw new BackendError('Email is not verified', {
              email: responseData.users[0].email,
              error: 'EMAIL_UNVERIFIED'
            });
          }
          return this.httpClient
            .get<{ [key: string]: UserData }>(`${this._db}user.json?orderBy="userId"&equalTo="${user.id}"&auth=${user.token}`);
        }),
        switchMap( dbResult => {
          console.log(dbResult);
          const roles = [];
          for (const key in dbResult) {
            if (dbResult.hasOwnProperty(key)) {
              roles.push(dbResult[key].role);
            }
          }
          if ( !(roles.includes(user.role)) ) {
            throw new BackendError('User has no role', {roles, requested: user.role, error: 'ROLE_MISMATCH'});
          }
          return of(user);
        })
      );
  }

  /**
   * Signup sequence:
   *
   * 1. Call the sign up endpoint of firebase authentication
   * 2. This returns the user data
   * 3. Call the email verification endpoint, sending a verification email
   * 4. Then call the database endpoint to store the role of the user as well in the db
   * 5. At the end an error is thrown so that the user goes and verifies his email. Log in will not work without it.
   */
  signup(email: string, password: string, role: string) {
    let user: User;
    return this.httpClient
      .post<FirebaseLoginResponse>(`${this._endpoint}signUp${this._key}`,
        {email, password, returnSecureToken: true})
      .pipe(
        switchMap(responseData => {
          user = FirebaseBackend.createUserFromFirebaseResponse(responseData, role);
          // send email verification
          return this.httpClient
            .post(`${this._endpoint}sendOobCode${this._key}`,
              {requestType: 'VERIFY_EMAIL', idToken: responseData.idToken});
        }),
        switchMap<FirebaseEmailResponse, Observable<any>>(response => {
          // this response contains the email of the user on success, but we do not need that
          console.log(response);
          // now store the freshly created user in the database.
          return this.httpClient.post(`${this._db}user.json?auth=${user.token}`,
            {userId: user.id, role: user.role});
        }),
        tap(() => {
          // we ignore the response, which is the successfully stored document.
          // we need the user to log in now. We only allow log in if the email has been verified.
          // the errors of the httpClient are handled by the caller.
          throw new BackendError('Registration Initiated', {error: 'LOGIN_AFTER_SIGNUP'});
        })
      );
  }

  passwordReset(email: string) {
    return this.httpClient.post(`${this._endpoint}sendOobCode${this._key}`,
      {requestType: 'PASSWORD_RESET', email}).pipe(
        tap( () => {
          throw new BackendError('Password Reset Mail Sent', {error: 'PASSWORD_RESET'});
        })
    );
  }
}

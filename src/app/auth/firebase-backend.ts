import {AuthBackend} from './auth-backend';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {User} from './user.model';
import {of} from 'rxjs';

interface FirebaseResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

export class FirebaseBackend implements AuthBackend {
  private _endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.firebaseAuth('signInWithPassword', email, password);
  }

  signup(email: string, password: string) {
    return this.firebaseAuth('signUp', email, password);
  }

  firebaseAuth(api: 'signUp' | 'signInWithPassword', email: string, password: string) {
    return this
      .httpClient
      .post<FirebaseResponseData>(`${this._endpoint}:${api}?key=${environment.firebaseApiKey}`,
        {email, password, returnSecureToken: true})
      .pipe(
        switchMap(responseData => {
          return of(
            new User(responseData.localId,
            responseData.refreshToken,
            responseData.idToken,
            new Date( Date.now() + (+responseData.expiresIn)*1000))
          );
        })
      );
  }
}

import * as firebase from 'firebase';

export type Role = 'doctor' | 'patient' | 'assistant';

export class AuthUser {
  private static token: string;

  constructor(public id: string,
              public email: string,
              public role: Role) {
  }

  // This is creating the user from the firebase authenticated user.
  // On signup, there is no claims, and we assign 'assistant' by default,
  // but that does not matter because it will be overwritten by the chosen role anyway.
  public static async fromDB(user: firebase.User) {
    this.token = await user.getIdToken(true);
    const token = await user.getIdTokenResult();
    return new AuthUser(
      user.uid,
      user.email,
      token.claims.patient ? 'patient' : (token.claims.doctor ? 'doctor' : 'assistant')
    );
  }

  public isDoctor(): boolean {
    return this.role === 'doctor';
  }

  public isPatient(): boolean {
    return this.role === 'patient';
  }
}

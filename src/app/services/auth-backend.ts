import {Observable} from 'rxjs';
import {User} from './../model/user.model';

export interface AuthBackend {
  login: (email: string, password: string, role: string) => Observable<User>;
  signup: (email: string, password: string, role: string) => Observable<string>;
  passwordReset: (email: string) => Observable<any>;
}

export class BackendError implements Error {
  readonly name = 'BackendError';
  readonly message: string;
  readonly error: any | null;
  constructor(message, error = null) {
    this.message = message;
    this.error = error;
  }
}

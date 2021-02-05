import {AuthUser} from '../model/auth-user.model';

export class BackendError implements Error {
  readonly name = 'BackendError';
  readonly message: string;
  readonly error: any | null;
  constructor(message, error = null) {
    this.message = message;
    this.error = error;
  }
}

export class SuperadminBreak implements Error {
  readonly name = 'SuperadminBreak';
  readonly message: string;
  readonly user: AuthUser;
  constructor(user = null) {
    this.user = user;
  }
}

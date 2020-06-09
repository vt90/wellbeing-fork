import {Observable} from 'rxjs';
import {User} from './user.model';

export interface AuthBackend {
  login: (email: string, password: string) => Observable<User>;
  signup: (email: string, password: string) => Observable<User>;
}

import {AuthUser} from './auth-user.model';
import {Address} from './address.model';

export class BaseUser extends AuthUser {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  termsAndConditionsAcceptedAt: string;
  profilePic: any;
}

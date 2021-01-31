import {AuthUser} from './auth-user.model';
import {Address} from './address.model';

export class BaseUser extends AuthUser {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: Address;
  termsAndConditionsAcceptedAt: string;
  profilePic: any;
}

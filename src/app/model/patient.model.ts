import {BaseUser} from './base-user';
import {Address} from './address.model';
import {AuthUser} from './auth-user.model';

export class Patient extends BaseUser {
    doctors: string[];
    address: Address;
    treatments: string[];
    reports: string[];

    public static fromUser(user: AuthUser) {
        return new Patient(user.id, user.email, user.role);
    }
}

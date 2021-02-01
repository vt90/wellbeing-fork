import {BaseUser} from './base-user';
import {Address} from './address.model';

export class Patient extends BaseUser {
    doctors: string[];
    address: Address;
    treatments: string[];
    reports: string[];
}

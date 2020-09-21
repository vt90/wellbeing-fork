import {BaseUser} from './base-user';
import {Address} from './address';
import {DocDetail} from './doc-detail';


export class Doctor implements BaseUser {
    id: string;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: number;
    registrationID: string;
    verified: boolean;
    address: Address;
    details: DocDetail;
}

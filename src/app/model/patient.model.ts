import {BaseUser} from './base-user';

export class Patient extends BaseUser {
    doctors: string[];
    treatments: string[];
    reports: string[];
}

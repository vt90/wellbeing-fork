import {Address} from './address.interface';
import {Schedule} from '../doctor/onboarding/availability/schedule';


export class Clinic implements Address{
    clinicId: string;
    clinicname: string;
    doctors: string[];
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    mobile: number;
    state: string;
    zipcode: number;
    schedules: Schedule[];
}

import {Address} from './address.interface';
// import {Schedule} from '../doctor/onboarding/availability/schedule';

export class Schedule{
    availableDays: string[];
    fromTime: string;
    toTime: string;
    slotPerPatient: number;
}
export class Fee{
    cFee = 0;
    fFee = 0;
}
export class Clinic implements Address{
    clinicId: string;
    name: string;
    doctors: string[];
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    mobile: number;
    state: string;
    zipcode: number;
    schedules: Schedule[] = [];
    fee: Fee = new Fee();
}

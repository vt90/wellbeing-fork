import {Address} from './address.model';

export class Schedule{
    availableDays: string[];
    fromTime: string;
    toTime: string;
    slotPerPatient: number;
}

export class Fee {
    consultationFee: number;
    followUpFee: number;
}

export class Clinic {
    clinicId: string;
    name: string;
    doctors: string[];
    address: Address;
    schedules: Schedule[];
    fee: Fee;
}

import {Address} from './address.model';

export class Schedule{
    availableDays: string[];
    fromTime: string;
    toTime: string;
    slotPerPatient: number;
}


export class Clinic {
    clinicIndex: number;
    assistants?: string[];
    name: string;
    doctors: string[];
    address: Address;
    schedules: Schedule[];
    consultationFee: number;
    followUpFee: number;
}

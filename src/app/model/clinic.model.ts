import {Address} from './address.model';

export class Schedule {
  availableDays: string[];
  fromTime: string;
  toTime: string;
  slotPerPatient: number;

  constructor(props?: Schedule) {
    if (!props?.availableDays) {
      this.availableDays = [];
    }
  }
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

  constructor(props?: Clinic) {
    if (!props?.address) {
      this.address = new Address();
    }

    if (!props?.schedules) {
      this.schedules = [new Schedule()];
    }
  }
}

export class Appointment{
    type: string;
    date: Date;
    time: string;
    confirmed = false;
    cancelled = false;
    ifCancelledReason: string;
    clinicId: string;
    patientId: string;
    doctorId: string;
}

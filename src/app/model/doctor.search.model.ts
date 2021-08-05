export class DoctorSearchModel {
  appointmentDate: string;
  specialization: string;
  subSpecialization: string;
  lat: number;
  lng: number;
  location: any;

  constructor() {
    this.appointmentDate = '';
    this.specialization = '';
    this.subSpecialization = '';
  }
}

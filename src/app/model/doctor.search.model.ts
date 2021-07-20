class GeoCoordinates {
  lat: number;
  lng: number;
}

export class DoctorSearchModel {
  appointmentDate: string;
  specialization: string;
  subSpecialization: string;
  location: GeoCoordinates;

  constructor() {
    this.appointmentDate = '';
    this.specialization = '';
    this.subSpecialization = '';
    this.location = { lat: 46.76356, lng: 23.58381};
  }
}

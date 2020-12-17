import {Address} from './address.interface';

export class Patient implements Address{
    patientId: string;
    email: string;
    fullName: string;
    contactNumber: number;
    dateOfBirth: string;
    gender: string;
    doctors: string[];
    visits: string[];
    treatments: string[];
    reports: string[];
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    mobile: number;
    state: string;
    zipcode: number;
    termsConditions: boolean;
}

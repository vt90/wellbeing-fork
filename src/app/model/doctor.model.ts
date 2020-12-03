import {BaseUser} from './base-user';
import {Address} from './address.interface';
import { Clinic } from './clinic.model';
import {Assistant} from './assistant.model';

export class Details{
    specialization: string;
    subspecialization: string;
    experience: number;
    profilePic: string;
    consultationFee: number;
    followupFee: number;
}

export class Doctor implements BaseUser,Address{
    id: string;
    email: string;
    fullName: string;
    dateOfBirth: string;
    registrationId: string;
    gender: string;
    verified: boolean;
   // address: Address;
    addressLine1: string;
    addressLine2: string;
    zipcode: number;
    city: string;
    state: string;
    country: string;
    mobile: number;
    details: Details;
    clinic: Clinic;
    assistants: Assistant[];
}

// to come: but these are not arrays but rather again objects. mapped to realtime db.
    // clinics: string[];
    // labs: string[];
    // assistants: string[];
    // appointments: string[];
    // patients: string[];

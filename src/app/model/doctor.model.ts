import {BaseUser} from './base-user';
import {Address} from './address.interface';
import { Clinic } from './clinic.model';
import {Assistant} from './assistant.model';

export class Doctor implements BaseUser, Address{
    id: string;
    email: string;
    fName: string;
    lName: string;
    dateOfBirth: string;
    registrationId: string;
    gender: string;
    verified: boolean;
    addressLine1: string;
    addressLine2: string;
    zipcode: number;
    city: string;
    state: string;
    country: string;
    mobile: number;
    clinics: Clinic[] = [];
    assistants: Assistant[] = [];
    specialization: string;
    subspecialization: string;
    experience: string;
    documents: any;
    termsAndConditions: boolean;
    profilePic: any;
}

// to come: but these are not arrays but rather again objects. mapped to realtime db.
    // clinics: string[];
    // labs: string[];
    // assistants: string[];
    // appointments: string[];
    // patients: string[];

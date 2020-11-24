import {BaseUser} from './base-user';
import {Address} from './address';

export class Details{
    specialization: string;
    subspecialization: string;
    experience: number;
    profilePic: string;
    consultationFee: number;
    followupFee: number;
}

export class Doctor implements BaseUser {
    id: string;
    email: string;
    fullName: string;
    dateOfBirth: string;
    registrationId: string;
    gender: string;
    verified: boolean;
    address: Address;
    details: Details;
}

// to come: but these are not arrays but rather again objects. mapped to realtime db.
    // clinics: string[];
    // labs: string[];
    // assistants: string[];
    // appointments: string[];
    // patients: string[];

import {BaseUser} from './base-user';
import {Address} from './address';
import {DocDetail} from './doc-detail';

export class Basic{
    fullName: string;
    dateOfBirth: string;
    registrationId: string;
    gender: string;
    cCode: number;
    contact: number;
}


export class Doctor implements BaseUser {
    id: string;
    email: string;
    verified: boolean;
    basicDetails: Basic;
}

// to come: but these are not arrays but rather again objects. mapped to realtime db.
    // clinics: string[];
    // labs: string[];
    // assistants: string[];
    // appointments: string[];
    // patients: string[];

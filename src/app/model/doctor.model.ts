import {BaseUser} from './base-user';
import {AuthUser} from './auth-user.model';
import {Clinic} from './clinic.model';

export class Doctor extends BaseUser {
    registrationId: string;
    verified: boolean;
    clinics: Clinic[];
    patients: string[];
    specialization: string;
    subspecialization: string;
    experience: string;
    about?: string;
    certificate: string;
    documents: any;
    mobile: number;

    public static fromUser(user: AuthUser) {
        return new Doctor(user.id, user.email, user.role);
    }
}

import {BaseUser} from './base-user';
import {AuthUser} from './auth-user.model';

export class Doctor extends BaseUser {
    registrationId: string;
    verified: boolean;
    clinics: string[];
    patients: string[];
    assistants: string[];
    specialization: string;
    subspecialization: string;
    experience: string;
    documents: any;

    public static fromUser(user: AuthUser) {
        return new Doctor(user.id, user.email, user.role);
    }
}

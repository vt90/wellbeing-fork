interface  Details{
    specialization: string;
    subSpecialization: string;
    about: string;
    termAndConditions: boolean;
    profilePic: string;
    consultationFee: string;
    followUpFee: string;
    experience: string;
}

export class Doctor {
    doctorId: string
    email: string;
    regId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    address: Address;
    verified: boolean;
    details: Details;
    clinics: string[];
    labs: string[];
    assistants: string[];
    appointments: string[];
    patients: string[];
}

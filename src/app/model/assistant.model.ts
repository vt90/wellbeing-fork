import {Address} from './address.interface';

export class Assistant implements Address{
    assistantId: string;
    fName: string;
    lName: string;
    email: string;
    contact: number;
    education: string;
    profilePic: string;
    gender: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    mobile: number;
    state: string;
    zipcode: number;
}

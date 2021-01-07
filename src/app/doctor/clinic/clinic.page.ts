import {Component, OnInit} from '@angular/core';
import {Clinic} from '../../model/clinic.model';
import {AuthService} from '../../services/auth.service';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Doctor} from '../../model/doctor.model';

@Component({
    selector: 'app-clinic',
    templateUrl: './clinic.page.html',
    styleUrls: ['./clinic.page.scss'],
})
export class ClinicPage implements OnInit {
    doctor: Doctor = null;
    userId: string;
    clinics: Clinic[];

    constructor(private authService: AuthService,
                private doctorService: DoctorService) {
    }

    ngOnInit() {
        this.userId = this.authService.userID;
        this.doctorService.getDoctorById(this.userId).then(doctor => {
            this.doctor = doctor;
            this.clinics = doctor.clinics;
        });
    }

}

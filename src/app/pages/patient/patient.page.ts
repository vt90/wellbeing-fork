import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PatientService} from '../../services/patient/patient.service';
import {Patient} from '../../model/patient.model';
import {TranslateService} from '@ngx-translate/core';
import {Doctor} from '../../model/doctor.model';
import {ModalController} from '@ionic/angular';
import {DoctorDetailsComponent} from './doctor-details/doctor-details.component';


@Component({
    selector: 'app-patient',
    templateUrl: './patient.page.html',
    styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
    patient: Patient;
    patientId: string;
    specializations: string[];
    subSpecializations: string[];
    doctors: Doctor[];
    specialization: string;
    specializationsFromDB: any;
    searchedDoctors: Doctor[];

    constructor(private authService: AuthService,
                private router: Router,
                private patientService: PatientService,
                private translate: TranslateService,
                private modalCtrl: ModalController) {
    }

    onLogout() {
        this.router.navigateByUrl('/auth');
        this.authService.logout();
    }

    ngOnInit() {
        this.patientId = this.authService.userID;
        this.patientService.getPatientById(this.patientId).then(patient => {
            this.patient = patient;
        });
        this.patientService.retrieveSpecializations().then(specs => {
            this.specializationsFromDB = specs;
            this.specificationsOptions(specs);
        });
        this.patientService.retrieveDoctors().then(docs => {
            this.doctors = docs;
        });
    }

    specificationsOptions(s: string[]) {
        const specs: string[] = [];
        for (const key in s) {
            if (s.hasOwnProperty(key)) {
                specs.push(s[key]['name_' + this.translate.currentLang]);
            }
        }
        this.specializations = specs;
    }

    onSpecChange(s: string) {
        const subSpecs: string[] = [];
        for (const key in this.specializationsFromDB) {
            if (this.specializationsFromDB.hasOwnProperty(key)) {
                if (this.specializationsFromDB[key].subspecializations &&
                    s === this.specializationsFromDB[key]['name_' + this.translate.currentLang]) {
                    this.specializationsFromDB[key].subspecializations.forEach(sub => {
                        subSpecs.push(sub['name_' + this.translate.currentLang]);
                    });
                }
            }
        }
        this.subSpecializations = subSpecs;
        this.searchDoctors();
    }

    searchDoctors() {
        this.patientService.getDoctorsBySpecialization(this.specialization).then(r => {
            const docs = [];
            Object.keys(r).map(key => {
                r[key].id = key;
                docs.push(r[key]);
            });
            this.searchedDoctors = docs;
        });
    }

    showAppointmentDetails(d: Doctor) {
        this.modalCtrl.create({
            component: DoctorDetailsComponent,
            componentProps: {doc: d, pId: this.patientId}
        }).then(modalElement => {
            modalElement.present();
            return modalElement.onDidDismiss();
        });
    }
}

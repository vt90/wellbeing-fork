import {Component, OnInit} from '@angular/core';
import {Doctor} from '../../model/doctor.model';
import {AuthService} from '../../services/auth.service';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Clinic} from '../../model/clinic.model';
import {ModalController} from '@ionic/angular';
import {AddClinicComponent} from '../add-clinic/add-clinic.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit{
  doctor: Doctor = null;
  userId: string;
  clinics: Clinic[];

  constructor(private authService: AuthService,
              private doctorService: DoctorService,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.userId = this.authService.userID;
    this.doctorService.getDoctorById(this.userId).then(doctor => {
      this.doctor = doctor;
      this.clinics = doctor.clinics;
    });
  }

  addClinic(){
    this.modalCtrl.create({
      component: AddClinicComponent,
    }).then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    });
  }

}

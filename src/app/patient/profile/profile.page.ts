import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient/patient.service';
import {Patient} from '../../model/patient.model';
import {NgForm} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  patient: Patient = null;
  userId: string;
  changePassword: boolean;

  constructor(private authService: AuthService,
              private patientService: PatientService,
              public alertCtrl: AlertController) { }

  ngOnInit() {
    this.userId = this.authService.userID;
    this.patientService.getPatientById(this.userId).then(patient => {
      console.log(patient);
      this.patient = patient;
    });
  }

  onProfilePicChange(event: any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (e) => { // called once readAsDataURL is completed
        this.patient.profilePic = e.target.result;
      };
    }
  }

  save(profileForm: NgForm) {
    if (!profileForm.valid) {
      return;
    }
    this.patientService.addPatient(this.patient, this.userId);
    this.showAlert().then(r => console.log(r));
  }

  async showAlert(){
    return this.alertCtrl.create({
      message: 'Profile updated successfully',
      buttons: ['OK']
    }).then((alert) => alert.present());
  }

  newPassword(pwdForm: NgForm){
    if (pwdForm.invalid){
      return;
    }
    const newPwd = pwdForm.value.nPass;
    this.authService.changePassword(this.patient.email, newPwd).then((r) => {
        console.log(r);
        this.alertCtrl.create({
            message: 'Password updated successfully,please login again',
            buttons: ['OK']
        }).then((alert) => {
            alert.present();
            return alert.onDidDismiss();
        });
    });
  }

  removeProfilePic(){
    this.alertCtrl.create({
      message: 'Do you want to remove Profile Pic?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          handler: () => {
              this.patient.profilePic = null;
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('no change in profile pic');
          }
        }
      ]
    }).then((alert) => {
      alert.present().then(r => console.log(r));
      return alert.onDidDismiss();
    });
  }
}

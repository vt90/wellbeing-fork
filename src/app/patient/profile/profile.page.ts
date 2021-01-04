import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient/patient.service';
import {Patient} from '../../model/patient.model';
import {NgForm} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

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
              private router: Router,
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
    this.showAlert();
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
      this.router.navigateByUrl('/auth');
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PatientService} from '../../services/patient/patient.service';
import {Patient} from '../../model/patient.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  patient: Patient = null;

  constructor(private authService: AuthService,
              private patientService: PatientService) { }

  ngOnInit() {
    const id = this.authService.userID;
    this.patientService.getPatientById(id).then(patient => {
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
  }

}

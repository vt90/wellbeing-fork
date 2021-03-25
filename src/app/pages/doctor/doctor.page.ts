import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Doctor} from '../../model/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  doctor: Doctor;

  constructor(private authService: AuthService,
              private router: Router,
              private doctorService: DoctorService) {
  }

  ngOnInit() {
    const id = this.authService.userID;
    this.doctorService.getDoctorOrAssistantById(id).then(doctor => {
      this.doctor = doctor;
    });
  }

  onLogout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}

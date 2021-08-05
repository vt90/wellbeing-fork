import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DoctorSearchModel} from '../../../model/doctor.search.model';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {TranslateService} from '@ngx-translate/core';
import {ModalController} from '@ionic/angular';
import {BookApointmentComponent} from './book-apointment/book-apointment.component';
import moment from 'moment';
import {SearchDoctorComponent} from '../../../shared/components/search-doctor/search-doctor.component';
import {AuthUser} from '../../../model/auth-user.model';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  @ViewChild('doctorSearch') doctorSearch: SearchDoctorComponent;
  queryParmas: any;
  doctorsList: any[];
  doctorsListForMap: any[];
  lat: number;
  lng: number;
  user: AuthUser;

  constructor(
    public translate: TranslateService,
    public modalController: ModalController,
    private authService: AuthService,
    private route: ActivatedRoute,
    private doctorsService: DoctorService,
  ) {
    this.authService
      .observeUser()
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParmas: any) => {
      this.queryParmas = queryParmas;
      this.lat = parseFloat(queryParmas.lat);
      this.lng = parseFloat(queryParmas.lng);
    });
  }

  onDoctorSearch(doctorSearchModel: DoctorSearchModel) {
    const query = {
      ...doctorSearchModel,
      location: {
        lat: parseFloat(String(doctorSearchModel.lat)),
        lng: parseFloat(String(doctorSearchModel.lng)),
      },
    };

    delete query.lat;
    delete query.lng;

    this.doctorsService.findDoctors(query)
      .then((result) => {
        const doctorList = result?.doctors || [];
        this.doctorsList = doctorList;
        this.doctorsListForMap = doctorList.filter((doctor) => doctor.coordinates);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  async presentAlertPrompt(doctorClinicInfo) {
    const now = moment();
    const searchDate = moment(this.doctorSearch.doctorSearchModel.appointmentDate);

    const minDate = (searchDate.isBefore(now) ? now : searchDate)
      // .add(1, 'hour')
      .toDate();

    const modal = await this.modalController.create({
      component: BookApointmentComponent,
      componentProps: {
        doctorId: doctorClinicInfo.doctorId,
        clinicIndex: doctorClinicInfo.clinicIndex,
        minDate,
        doctorClinicInfo,
      },
    });

    await modal.present();
  }
}

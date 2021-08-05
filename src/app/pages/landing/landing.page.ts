import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthUser} from '../../model/auth-user.model';
import {DoctorSearchModel} from '../../model/doctor.search.model';
import {DoctorService} from '../../services/doctor/doctor.service';
import {Plugins} from '@capacitor/core';
import {Router} from '@angular/router';

const {Geolocation} = Plugins;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  doctorsList: any[];
  doctorsListForMap: any[];
  lat: number = null;
  lng: number = null;

  constructor(
    public router: Router,
    public translate: TranslateService,
    private doctorsService: DoctorService,
  ) {
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    Geolocation
      .getCurrentPosition()
      .then((position) => {
        const { coords: { latitude, longitude } } = position;

        this.lat = latitude;
        this.lng = longitude;
      }, (err) => {
        console.log(err);
        console.log('Could not initialise map');
      });
  }

  onDoctorSearch(doctorSearchModel: DoctorSearchModel) {
    this.router.navigate(['/doctor-search'], {
      queryParams: {
        ...doctorSearchModel,
        lat: this.lat,
        lng: this.lng,
      }
    });
  }

  onMapPositionChange({ latitude, longitude }) {
    this.lat = latitude;
    this.lng = longitude;
  }

}



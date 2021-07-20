import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {PatientService} from '../../../services/patient/patient.service';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {DoctorSearchModel} from '../../../model/doctor.search.model';
import * as moment from 'moment';

interface SpecializationInfo {
  name: string;
  value: string;
  subspecializations?: SpecializationInfo;
}

@Component({
  selector: 'app-search-doctor',
  templateUrl: './search-doctor.component.html',
  styleUrls: ['./search-doctor.component.scss'],
})
export class SearchDoctorComponent implements OnInit {
  @Output() onSearch: EventEmitter<DoctorSearchModel> = new EventEmitter();

  doctorSearchModel: DoctorSearchModel;
  specializations: SpecializationInfo[];
  subSpecializations: SpecializationInfo[];


  minDate: Date;
  maxDate: Date;

  constructor(
    private doctorService: DoctorService,
    private translate: TranslateService,
  ) {
    this.doctorSearchModel = new DoctorSearchModel();
    this.doctorSearchModel.appointmentDate = moment().format('YYYY-MM-DD');

    this.minDate = moment().toDate();
    this.maxDate = moment().add(1, 'month').toDate();
  }

  ngOnInit() {
    this.getSpecializations();
  }

  getSpecializations() {
    this.doctorService.retrieveSpecializations()
      .then((specs) => {
        this.specializations = Object.values(specs)
          .map((specialization) => this.mapSpecialization(specialization));
      });

  }

  mapSpecialization(specialization: any): SpecializationInfo {
    const specializationText = specialization[`name_${this.translate.currentLang}`];
    const subspecializations = specialization?.subspecializations;

    return {
      name: specializationText,
      value: specializationText,
      subspecializations: !!subspecializations?.length
        ? subspecializations.map((subSpec) => this.mapSpecialization(subSpec))
        : []
    };
  }

  onSpecializationChange(specialization: string) {
    let subSpecs: SpecializationInfo[] = [];

    if (specialization && this.specializations?.length) {
      const specializationInfo = this.specializations.find((spec) => spec.value === specialization);

      if (specializationInfo?.subspecializations) {
        // @ts-ignore
        subSpecs = specializationInfo?.subspecializations;
      }
    }

    this.subSpecializations = subSpecs;
  }

  onSubmit(form: NgForm) {
    console.log('submitting');
    console.log(this.doctorSearchModel);

    this.onSearch.emit(this.doctorSearchModel);
  }
}

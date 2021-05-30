import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {AuthService} from '../../../services/auth.service';
import {Assistant} from '../../../model/assistant.model';
import {Doctor} from '../../../model/doctor.model';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {LoadingController} from '@ionic/angular';


@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.page.html',
  styleUrls: ['./assistant.page.scss'],
})
export class AssistantPage implements OnInit {
  assistant: Assistant;
  doctorAssistants: Assistant[];
  doctor: Doctor;

  constructor(
    private authService: AuthService,
    private doctorService: DoctorService,
    private loadingCtrl: LoadingController,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {
    const id = this.authService.userID;
    this.doctorService.getDoctorOrAssistantById(id).then(doctor => {
      this.doctor = doctor;
    });
    this.onReset();
  }

  onReset() {
    this.getDoctorAssistants();
    this.resetAssistantValues();
  }

  getDoctorAssistants() {
    this.doctorService.getDoctorsAssistants(this.authService.userID)
      .then((assitants) => this.doctorAssistants = assitants)
      .catch((error) => console.log(error));
  }

  resetAssistantValues() {
    this.assistant = new Assistant(null, '', 'assistant');
    this.assistant.doctorId = this.authService.userID;
  }

  getAge(birthday: string) {
    return moment().diff(moment(birthday), 'years');
  }

  onEditInit(assistant: Assistant) {
    this.assistant = assistant;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const [firstName, ...lastNameEntries] = this.assistant.fullName.split(' ');
    const lastName = lastNameEntries.join(' ');

    this.assistant.firstName = firstName;
    this.assistant.lastName = lastName;

    this.onHttpAction(
      this.assistant.id
        ? this.doctorService.editAssistant(this.assistant.id, this.assistant)
        : this.doctorService.addAssistant(this.assistant),
      this.translate.instant('DOCTOR_ASSISTANT.Saving doctor assistant'),
      form,
    );
  }

  onDelete(assistant: Assistant) {
    this.onHttpAction(
      this.doctorService.deleteAssistant(assistant.id),
      this.translate.instant('DOCTOR_ASSISTANT.Removing doctor assistant')
    );
  }

  onHttpAction(action: Promise<any>, message: string, form?: NgForm) {
    let loadingElement;

    this.loadingCtrl
      .create({ keyboardClose: false, message})
      .then(el => {
        loadingElement = el;
        return el.present();
      })
      .then(() => {
        action
          .then(() => {
            this.onReset();

            if (form) {
              form.resetForm();
            }
          })
          .catch((error) => {
            console.log(':(');
            console.log(error);
          })
          .finally(() => {
            loadingElement.dismiss().then();
          });
      });
  }
}

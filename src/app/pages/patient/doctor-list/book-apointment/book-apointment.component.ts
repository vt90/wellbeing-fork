import {Component, Input, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DoctorBookModel} from '../../../../model/doctor.book.model';
import moment from 'moment';
import {DoctorService} from '../../../../services/doctor/doctor.service';
import {ModalController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {AuthUser} from '../../../../model/auth-user.model';
import {AuthService} from '../../../../services/auth.service';
import {PatientService} from '../../../../services/patient/patient.service';
import {Patient} from '../../../../model/patient.model';
import {Router} from '@angular/router';

/*
* Morning is from sunrise to 11:59 AM. Sunrise typically occurs around 6 AM.
Noon is at 12:00 PM.
Afternoon is from 12:01 PM to around 5:00 PM.
Evening is from 5:01 PM to 8 PM, or around sunset.
Night is from sunset to sunrise, so from 8:01 PM until 5:59 AM.
* */

@Component({
  selector: 'app-doctor-list',
  templateUrl: './book-apointment.component.html',
  styleUrls: ['./book-apointment.component.scss'],
})
export class BookApointmentComponent implements OnInit {
  @Input() minDate: Date;
  @Input() doctorId: string;
  @Input() clinicIndex: number;
  @Input() doctorClinicInfo: any;

  doctorBookInfo: DoctorBookModel;
  user: AuthUser;
  error: string;
  availability: any[];

  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private router: Router,
  ) {
    this.doctorBookInfo = new DoctorBookModel();
    this.authService
      .observeUser()
      .subscribe((user) => {
        this.user = user;

        this.patientService.getPatientById(this.authService.userID).then((patient: Patient) => {
          this.doctorBookInfo.patientName = `${patient.firstName} ${patient.lastName}`;
        });
      });
  }

  ngOnInit(): void {
    const availabilitySearch = new DoctorBookModel();
    availabilitySearch.clinicIndex = this.clinicIndex;
    availabilitySearch.appointmentDate = moment(this.minDate).format('YYYY.MM.DD HH:mm:ss');
    this.doctorService.getDoctorAvailability(this.doctorId, availabilitySearch)
      .then((data) => {
        this.availability = this.doctorClinicInfo.clinic.schedules.reduce((acc, schedule) => {
          const scheduleAvailability = [];
          const {
            fromTime,
            toTime,
            slotPerPatient,
          } = schedule;

          const [startHour, startMinute] = fromTime.split(':');
          const [endHour, endMinute] = toTime.split(':');
          const iterator = moment().set({
            hour: startHour,
            minute: startMinute,
          });
          const comparator = moment().set({
            hour: endHour,
            minute: endMinute,
          });

          while (comparator.diff(iterator) > 0) {
            const timeSlot = iterator.format('HH:mm');

            // @ts-ignore
            const isAvailable = data.availability?.find((a) => a.includes(timeSlot));

            scheduleAvailability.push({isAvailable: !!isAvailable, timeSlot});

            iterator.add(slotPerPatient, 'minutes');
          }

          return [...acc, ...scheduleAvailability];
        }, []);
        this.setAppointmentDate(data.availability[0]);
      })
      .catch(console.log);
  }

  setAppointmentDate(timeSlot: string) {
    const [startHour, startMinute] = timeSlot.split(':');
    this.doctorBookInfo.appointmentDate = moment(this.minDate).set({
      hour: parseInt(startHour, 10),
      minute: parseInt(startMinute, 10),
      second: 0,
    }).format('YYYY.MM.DD HH:mm:ss');
  }

  getMinDate() {
    return moment(this.minDate).format('HH:mm');
  }

  isTimeSlotSelected(timeSlot: string) {
    return this.doctorBookInfo.appointmentDate?.includes(timeSlot);
  }

  getAppointmentDate() {
    return moment(this.minDate).format('YYYY.MM.DD');
  }

  onSubmit() {
    this.error = null;
    this.doctorBookInfo.clinicIndex = this.clinicIndex;

    this.doctorService.bookDoctor(this.doctorId, this.doctorBookInfo)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        else {
          this.toastController.create({
            message: 'Doctor booked successfully.',
            duration: 3000,
            position: 'top'
          })
            .then((toast) => toast.present());

          this.router.navigateByUrl('/patient');
          this.modalCtrl.dismiss();
        }
      })
      .catch((error) => {
        this.error = error;
        console.error(error);
      });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { AppointmentBook } from 'src/app/model/appointment-book.model';
import { DoctorBookModel } from 'src/app/model/doctor.book.model';
import { AppointmentService } from 'src/app/services/doctor/appointment.service';
import { DoctorService } from 'src/app/services/doctor/doctor.service';

@Component({
  selector: 'app-appointment-reschedule',
  templateUrl: './appointment-reschedule.component.html',
  styleUrls: ['./appointment-reschedule.component.scss'],
})
export class AppointmentRescheduleComponent implements OnInit {
  @Input() appointment: AppointmentBook;
  @Input() doctorInfo: any;

  step = 1;
  error: string;
  availability: any[];
  appointmentDate: any = null;
  minDate: any;
  constructor(
    private translate: TranslateService,
    private modalController: ModalController,
    private doctorService: DoctorService,
    private toastController: ToastController,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.getNewAppointmentMinDate();
    this.doctorInfo.patientName = this.appointment?.patientName || '';
    if (this.appointment.dateOfBirth){
      this.doctorInfo.dateOfBirth = moment(this.appointment.dateOfBirth).format("YYYY MM DD")
    }
  }
  getNewAppointmentMinDate() {
    let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    this.minDate = tomorrow;
  }
  onChange(e: any) {
    this.appointmentDate = e.target.value;
    const availabilitySearch = new DoctorBookModel();
    availabilitySearch.clinicIndex = this.doctorInfo.clinicIndex;
    availabilitySearch.appointmentDate = moment(e.target.value).format('YYYY.MM.DD HH:mm:ss');
    this.doctorService
      .getDoctorAvailability(this.doctorInfo.doctorId, availabilitySearch)
      .then((data) => {
        this.availability = this.doctorInfo.clinic.schedules.reduce((acc, schedule) => {
          const scheduleAvailability = [];
          const { fromTime, toTime, slotPerPatient } = schedule;

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

            scheduleAvailability.push({ isAvailable: !!isAvailable, timeSlot });

            iterator.add(slotPerPatient, 'minutes');
          }

          return [...acc, ...scheduleAvailability];
        }, []);
        this.setAppointmentDate(data.availability[0]);
      })
      .catch(console.log);
  }
  next() {
    this.step = 2;
  }
  prev() {
    this.step = 1;
  }

  setAppointmentDate(timeSlot: string) {
    const [startHour, startMinute] = timeSlot.split(':');
    this.doctorInfo.appointmentDate = moment(this.appointmentDate)
      .set({
        hour: parseInt(startHour, 10),
        minute: parseInt(startMinute, 10),
        second: 0,
      })
      .format('YYYY.MM.DD HH:mm:ss');
  }

  getMinDate() {
    return moment(this.appointmentDate).format('HH:mm');
  }

  isTimeSlotSelected(timeSlot: string) {
    return this.doctorInfo.appointmentDate?.includes(timeSlot);
  }

  getAppointmentDate() {
    return moment(this.appointmentDate).format('YYYY.MM.DD');
  }

  onSubmit() {
    this.error = null;
    this.doctorInfo.patientId = this.appointment.patientId;
    this.doctorService
      .bookDoctor(this.doctorInfo.doctorId, this.doctorInfo)
      .then(async (data) => {
        if (data.error) {
          throw new Error(data.error);
        } else {
          this.toastController
            .create({
              message: 'Appointment succesfully reschedule.',
              duration: 3000,
              position: 'top',
            })
            .then((toast) => toast.present());
          await this.appointmentService.deleteAppointment(this.appointment.id);
          this.modalController.dismiss();
        }
      })
      .catch((error) => {
        this.error = error;
        console.error(error);
      });
  }
}

import * as fbAdmin from 'firebase-admin';
import * as moment from 'moment';

export const removeDoctorBookingInfo = async (doctorId: string) => {
  const removals: Promise<any>[] = [];
  await fbAdmin
    .database()
    .ref('/doctor-booking-info')
    .orderByChild('doctorId')
    .equalTo(doctorId)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((child) =>{
        removals.push(child.ref.remove())
      });
    });

  await Promise.all(removals);
};

export const getDoctorClinicAvailabilityInfo = async (doctorId: string, clinicIndex: string | number, appointmentDate: string, shouldCompareScheduleTime: boolean = false) => {
  const day =  moment(appointmentDate);

  // check if doctor has a valid schedule
  return fbAdmin
    .database()
    .ref('/doctor-booking-info')
    .orderByChild(`doctorId`)
    .equalTo(doctorId)
    .once('value')
    .then(snapshot =>
      snapshot.val()
      && Object.values(snapshot.val())
    )
    .then(doctorBookingInfos =>
      doctorBookingInfos
      && doctorBookingInfos.filter((bInfo: any) => {
        return bInfo.clinicIndex === clinicIndex
          && bInfo.availableDays[day.format('dddd')]
          && bInfo.clinic.schedules.find((schedule: any) => {
            const {
              fromTime,
              toTime,
            } = schedule;

            const startDate = moment().set({
              hour: fromTime.split(':')[0],
              minute: fromTime.split(':')[1],
            });

            const endDate = moment()
              .set({
                hour: toTime.split(':')[0],
                minute: toTime.split(':')[1],
              });

            const comparator = moment()
              .set({
                hour: day.hour(),
                minute: day.minutes(),
              });

            return shouldCompareScheduleTime
              ? comparator.isBetween(startDate, endDate)
              : true;
          })
      })
    )
    .then((dBookingInfo) => dBookingInfo[0]);
};

export const getDoctorBookings = async (doctorId: string) => {
  return fbAdmin.database()
    .ref('/bookings')
    .orderByChild(`doctorId`)
    .equalTo(doctorId)
    .once('value')
    .then(snapshot =>
      snapshot.val()
      && Object.values(snapshot.val())
    );
};

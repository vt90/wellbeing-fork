import { Request, Response } from 'express';
import * as fbAdmin from 'firebase-admin';
import * as geofire from 'geofire-common';
// import * as functions from 'firebase-functions';
import * as moment from 'moment';
import { orderBy } from 'lodash';
import router from 'express-promise-router';
import { validateFirebaseIdToken } from '../middlewares/validateUser';
import { getDoctorClinicAvailabilityInfo, getDoctorBookings } from '../services/doctors';
import { getEmailTemplateByFileName, sendEmail } from '../services/email';

const doctorsRouter = router();

doctorsRouter.route('/find').post(async (req: Request, res: Response) => {
  try {
    const { appointmentDate, location, specialization, subSpecialization } = req.body;

    const dayOfWeek = moment(appointmentDate).format('dddd');

    const doctors = await fbAdmin
      .database()
      .ref('/doctor-booking-info')
      .orderByChild(`availableDays/${dayOfWeek}`)
      .equalTo(true)
      .once('value')
      .then((snapshot) => Object.values(snapshot.val()))
      .then(async (doctorList) => {
        const mappedDoctors = [];
        for (let doctor of doctorList) {
          // @ts-ignore
          if (doctor.coordinates) {
            // @ts-ignore
            const { lat, lng } = doctor.coordinates;

            // @ts-ignore
            doctor.distanceInKm = geofire.distanceBetween([lat, lng], [location.lat, location.lng]);
          }

          if (subSpecialization) {
            // @ts-ignore
            if (doctor.doctorInfo.subspecialization === subSpecialization) {
              mappedDoctors.push(doctor);
            }
          } else if (specialization) {
            // @ts-ignore
            if (doctor.doctorInfo.specialization === specialization) {
              mappedDoctors.push(doctor);
            }
          } else {
            mappedDoctors.push(doctor);
          }
        }

        return orderBy(mappedDoctors, ['distanceInKm']);
      });

    res.json({
      total: doctors?.length,
      doctors,
    });
  } catch (e) {
    res.json({ error: e });
  }
});

doctorsRouter.route('/:doctorId/find/').get(async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctors = await fbAdmin
      .database()
      .ref('/doctor-booking-info')
      .orderByChild(`doctorId`)
      .equalTo(`${doctorId}`)
      .once('value')
      .then((snapshot) => Object.values(snapshot.val()));
    res.json({
      total: doctors?.length,
      doctors,
    });
  } catch (e) {
    res.json({ error: e });
  }
});

doctorsRouter
  .route('/:doctorId/get-availability')
  .post(validateFirebaseIdToken, async (req: Request, res: Response) => {
    try {
      const { appointmentDate, clinicIndex } = req.body;

      const { doctorId } = req.params;
      const day = moment(appointmentDate);

      const doctorInfo = await getDoctorClinicAvailabilityInfo(
        doctorId,
        clinicIndex,
        appointmentDate
      );

      if (doctorInfo) {
        const existingBooking = await getDoctorBookings(doctorId).then(
          (doctorBookingInfos) =>
            doctorBookingInfos &&
            doctorBookingInfos.filter((bInfo: any) => {
              return bInfo.appointmentDate.includes(day.format('YYYY.MM.DD'));
            })
        );

        // @ts-ignore
        const availability = doctorInfo.clinic.schedules.reduce((acc, schedule) => {
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
            const isBooked = existingBooking.find((b) => b.appointmentDate.includes(timeSlot));

            if (!isBooked) {
              scheduleAvailability.push(timeSlot);
            }

            iterator.add(slotPerPatient, 'minutes');
          }

          return [...acc, ...scheduleAvailability];
        }, []);

        res.json({
          availability,
        });
      } else {
        throw new Error('Doctor unavailable');
      }
    } catch (e) {
      res.json({ error: e.message || e });
    }
  });

doctorsRouter
  .route('/:doctorId/book')
  .post(validateFirebaseIdToken, async (req: Request, res: Response) => {
    try {
      const { appointmentDate, appointmentType, clinicIndex, dateOfBirth, patientName, patientId } =
        req.body;

      const { doctorId } = req.params;
      const day = moment(appointmentDate);

      const doctorInfo = await getDoctorClinicAvailabilityInfo(
        doctorId,
        clinicIndex,
        appointmentDate,
        true
      );

      if (doctorInfo) {
        // try to find if there are exisiting bookings on that date and time
        // if not save booking info

        const newBooking = {
          doctorId: req.params.doctorId,
          // @ts-ignore
          patientId: patientId || req.user.uid,
          appointmentDate: day.format('YYYY.MM.DD HH:mm'),
          patientName,
          dateOfBirth,
          appointmentType,
          status: 'PENDING',
          clinicIndex,
        };

        const existingBooking = await getDoctorBookings(doctorId).then(
          (doctorBookingInfos) =>
            doctorBookingInfos &&
            doctorBookingInfos.filter((bInfo: any) => {
              return bInfo.appointmentDate === newBooking.appointmentDate;
            })
        );

        if (existingBooking && existingBooking.length) {
          throw new Error('Doctor already booked');
        } else {
          await fbAdmin.database().ref(`/bookings`).push(newBooking);
        }

        const doctorAuthInfo = await fbAdmin.auth().getUser(doctorId);

        const html = getEmailTemplateByFileName('newBooking.pug', {
          link: 'test',
        });
        await sendEmail({
          to: doctorAuthInfo.email,
          from: 'noreply@wellbeing.com',
          subject: 'Booking Edited',
          html,
        });

        res.json({
          doctorAuthInfo,
          doctorId: req.params.doctorId,
          doctorInfo,
          existingBooking,
          newBooking,
          // @ts-ignore
          user: req.user,
        });
      } else {
        throw new Error('Doctor unavailable');
      }
    } catch (e) {
      res.json({ error: e.message || e });
    }
  });

export default doctorsRouter;

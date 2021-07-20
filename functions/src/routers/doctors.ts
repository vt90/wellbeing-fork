import {Request, Response} from 'express';
import * as fbAdmin from 'firebase-admin';
import * as geofire from 'geofire-common';
import * as functions from 'firebase-functions';
import * as moment from 'moment';
import {orderBy} from 'lodash';
import router from 'express-promise-router';
import {validateFirebaseIdToken} from '../middlewares/validateUser';

const doctorsRouter = router();

doctorsRouter.route('/find')
  .post(
    async (req: Request, res: Response) => {
      try {
        const {
          appointmentDate,
          location,
          specialization,
          subSpecialization,
        } = req.body;

        const dayOfWeek =  moment(appointmentDate).format('dddd');

        const doctors = await fbAdmin.database()
          .ref('/doctor-booking-info')
          .orderByChild(`availableDays/${dayOfWeek}`)
          .equalTo(true)
          .once('value')
          .then(snapshot => Object.values(snapshot.val()))
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
              }
              else if (specialization) {
                // @ts-ignore
                if (doctor.doctorInfo.specialization === specialization) {
                  mappedDoctors.push(doctor);
                }
              }
              else {
                mappedDoctors.push(doctor);
              }
            }

            return orderBy(mappedDoctors, ['distanceInKm']);
          });

        res.json({
          total: doctors?.length,
          doctors,
        });
      }
      catch (e) {
        res.json({ error: e })
      }
    },
  );

doctorsRouter.route('/:doctorId/book')
  .post(
    validateFirebaseIdToken,
    async (req: Request, res: Response) => {
      try {
        const {
          appointmentDate,
          clinicIndex
        } = req.body;

        const { doctorId } = req.params;
        const day =  moment(appointmentDate);

        // check if doctor has a valid schedule
        const doctorInfo = await fbAdmin.database()
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


                  functions.logger.debug(`
                    ${comparator.format('YYYY-MM-DD HH:mm')} - received day
                    ${startDate.format('YYYY-MM-DD HH:mm')} - startDate day
                    ${endDate.format('YYYY-MM-DD HH:mm')} - endDate day
                    ******

                    is between ${comparator.isBetween(startDate, endDate)}
                  `);

                  return comparator.isBetween(startDate, endDate);
                })
            })
          )
          .then((dBookingInfo) => dBookingInfo[0]);

        if (doctorInfo) {
          // try to find if there are exisiting bookings on that date and time
          // if not save booking info

          const newBooking = {
            doctorId: req.params.doctorId,
            // @ts-ignore
            patientId: req.user.uid,
            appointmentDate: day.format('YYYY.MM.DD HH:mm')
          };

          const existingBooking = await fbAdmin.database()
            .ref('/bookings')
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
                return bInfo.appointmentDate === newBooking.appointmentDate;
              })
            );

          if (existingBooking && existingBooking.length) {
            throw new Error('Doctor already booked')
          }
          else {
            await fbAdmin.database().ref(`/bookings`).push(newBooking)
          }

          res.json({
            doctorId: req.params.doctorId,
            doctorInfo,
            existingBooking,
            newBooking,
            // @ts-ignore
            user: req.user,
          });
        }
        else {
          throw new Error('Doctor unavailable');
        }
      }
      catch (e) {
        res.json({ error: e.message || e })
      }
    },
  );

export default doctorsRouter;

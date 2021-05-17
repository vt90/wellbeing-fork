import {Request, Response} from 'express';
import * as fbAdmin from 'firebase-admin';
import * as geofire from 'geofire-common';
import * as moment from 'moment';
import {orderBy} from 'lodash';
import router from 'express-promise-router';

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

export default doctorsRouter;

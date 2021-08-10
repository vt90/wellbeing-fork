import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import routes from './routers';

import { removeDoctorBookingInfo } from './services/doctors';
import { getCoordinatesFromAddress } from './services/geolocation';

// import {environment} from './environment';
const app = admin.initializeApp();
const expressApp = express();

// Automatically allow cross-origin requests
expressApp.use(cors({ origin: true }));
expressApp.use(cookieParser());

expressApp.use(express.json());
expressApp.use(routes);

// Expose Express API as a single Cloud Function:
export const api = functions.https.onRequest(expressApp);

export const setUserType = functions.database // .region(environment.region) // .instance(environment.firebaseProjectId)
  .ref('/users/{userid}/role')
  .onCreate((snapshot, context) => {
    const userid = context.params.userid;
    const parent = snapshot.ref.parent;
    const role = snapshot.val();
    if (typeof role !== 'string' || !parent) {
      // check that we are ok
      return Promise.resolve();
    }
    return parent.remove().then(() => {
      if (snapshot.val() === 'doctor') {
        return admin.auth(app).setCustomUserClaims(userid, { doctor: true });
      }
      if (snapshot.val() === 'assistant') {
        return admin.auth(app).setCustomUserClaims(userid, { assistant: true });
      }
      // default is a patient.
      return admin.auth(app).setCustomUserClaims(userid, { patient: true });
    });
  });

// Write the new appointment to both the doctor and patient appointment collection.
// Remove it from new-appointments.
// This way the same appointment is available on both collections and they can be managed individually
// by the doctor or the patient, such that security is maintained. Neither the doctor can write to the
// patient appointments directly nor vice versa.
export const setAppointment = functions.database // .region(environment.region) // .instance(environment.firebaseProjectId)
  .ref('/new-appointments/{newappid}')
  .onCreate((snapshot, context) => {
    const newappid = context.params.newappid;
    const newAppointment = snapshot.val();
    const docApppointmentRef = snapshot.ref.root.child(
      `/doctor-appointment/${newAppointment.doctorId}/${newappid}`
    );
    const patientApppointmentRef = snapshot.ref.root.child(
      `/patient-appointment/${newAppointment.patientId}/${newappid}`
    );
    return docApppointmentRef
      .set(newAppointment)
      .then(() => {
        return patientApppointmentRef.set(newAppointment);
      })
      .then(() => {
        return snapshot.ref.remove();
      });
  });

// Each time a doctor changes something in his account, sync his information
// in the doctor-booking-info where we denormalize the data in order for it to be searched
export const setDoctorBookingInfo = functions.database // .region(environment.region) // .instance(environment.firebaseProjectId)
  .ref('/doctors/{doctorId}')
  .onWrite(async (change, context) => {
    const doctorId = context.params.doctorId;

    if (change.after.exists()) {
      const doctor = change.after.val();

      // Extract only needed fields/ do not provide any private info
      const {
        clinics,

        // meta fields
        firstName,
        lastName,
        gender,
        specialization,
        subspecialization,
      } = doctor;

      try {
        // 1. remove current doctor booking info
        await removeDoctorBookingInfo(doctorId);

        if (clinics?.length) {
          for (let clinicIndex = 0; clinicIndex < clinics.length; clinicIndex++) {
            const clinic = clinics[clinicIndex];

            const doctorBookingInfo = {
              doctorId,
              clinicIndex,
              doctorInfo: {
                firstName,
                lastName,
                gender,
                specialization,
                subspecialization,
              },
              clinic,
              availableDays: {},
            };

            try {
              const address = Object.values(clinic.address).join(', ');

              // @ts-ignore
              doctorBookingInfo.coordinates = await getCoordinatesFromAddress(address);
            } catch (e) {
              functions.logger.error(
                `Error occurred while trying to fetch coordinates for doctor ${doctorId} clinic ${clinic}`
              );
            }

            for (let schedule of clinic.schedules) {
              const { availableDays } = schedule;

              doctorBookingInfo.availableDays = availableDays.reduce((acc: object, day: string) => {
                return { ...acc, [day]: true };
              }, doctorBookingInfo.availableDays);
            }

            await admin.database().ref(`/doctor-booking-info`).push(doctorBookingInfo);
          }
        }
      } catch (e) {
        functions.logger.error('Error occured while tring to fetch coordinates');
        functions.logger.error(e);
      }
    } else {
      functions.logger.log('doctor has been removed');
      await removeDoctorBookingInfo(doctorId);
    }
  });

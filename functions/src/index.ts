import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {environment} from './environment';

const app = admin.initializeApp();

export const setUserType = functions
  .region(environment.region)
  .database.instance(environment.firebaseProjectId)
  .ref('/users/{userid}/role')
  .onCreate((snapshot, context) => {
    const userid = context.params.userid;
    const parent = snapshot.ref.parent;
    const role = snapshot.val();
    if (typeof role !== 'string' || !parent) { // check that we are ok
      return Promise.resolve();
    }
    return parent.remove().then(() => {
      if (snapshot.val() === 'doctor') {
        return admin.auth(app).setCustomUserClaims(userid, {doctor: true});
      }
      if (snapshot.val() === 'assistant') {
        return admin.auth(app).setCustomUserClaims(userid, {assistant: true});
      }
      // default is a patient.
      return admin.auth(app).setCustomUserClaims(userid, {patient: true});
    });
  });

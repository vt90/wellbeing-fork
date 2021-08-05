import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
  path: resolve(__dirname, '../../', '.env'),
});

export const environment = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyBtLyDgODrQMSgl-Cf8zwTePbqqH4WLJWo',
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || 'wellbeing-3d322',
  region: process.env.FIREBASE_REGION || 'europe-west1',
};

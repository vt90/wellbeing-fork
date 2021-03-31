import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
  path: resolve(__dirname, '../../', '.env'),
});

export const environment = {
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  region: process.env.FIREBASE_REGION,
};

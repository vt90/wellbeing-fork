import { Router } from 'express';
import doctorsRouter from './doctors';
import bookingsRouter from './bookings';
import authRouter from './auth';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/doctors', doctorsRouter);
routes.use('/bookings', bookingsRouter);

export default routes;

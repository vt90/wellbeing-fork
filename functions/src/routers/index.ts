import { Router } from 'express';
import doctorsRouter from './doctors';
import authRouter from './auth';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/doctors', doctorsRouter);

export default routes;

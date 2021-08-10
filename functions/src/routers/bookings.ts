import { Request, Response } from 'express';
import * as fbAdmin from 'firebase-admin';
import router from 'express-promise-router';
import { getEmailTemplateByFileName, sendEmail } from '../services/email';
import * as moment from 'moment';

const bookingRouter = router();

bookingRouter.route('/:bookingId').delete(async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    await fbAdmin.database().ref(`/bookings/${bookingId}`).remove();
    res.json({
      message: 'Appointment succesfully deleted',
    });
  } catch (e) {
    res.json({ error: e });
  }
});

bookingRouter.route('/:bookingId').put(async (req: Request, res: Response) => {
  try {
    const { ...fields } = req.body;
    const { bookingId } = req.params;
    await fbAdmin.database().ref(`/bookings/${bookingId}`).set(fields);
    try {
      const doctorAuthInfo = await fbAdmin.auth().getUser(fields.doctorId);
      const patientAuthInfo = await fbAdmin.auth().getUser(fields.patientId);
      const date = moment(fields.appointmentDate).format('YYYY-MM-DD HH:mm');
      const html = getEmailTemplateByFileName('bookingEdited.pug', {
        doctor: doctorAuthInfo.email,
        status: fields.status,
        date,
      });
      await sendEmail({
        to: [patientAuthInfo.email, doctorAuthInfo.email],
        from: 'noreply@wellbeing.com',
        subject: 'Edited booking',
        html,
      });
      console.log('EMAIL SUCCESFULLY SEND');
    } catch (e) {
      console.log('AN ERROR OCCURED', e);
    }
    res.json({
      message: 'Appointment succesfully updated',
    });
  } catch (e) {
    res.json({ error: e });
  }
});

export default bookingRouter;

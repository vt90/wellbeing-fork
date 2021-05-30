import {Request, Response} from 'express';
import * as fbAdmin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as Chance from 'chance';
import router from 'express-promise-router';

import {validateFirebaseIdToken} from '../middlewares/validateUser';
import {getEmailTemplateByFileName, sendEmail} from '../services/email';

const authRouter = router();

const getDoctorAssistant = async (req: Request) => {
  const assistant = await fbAdmin.database().ref(`/assistants/${req.params.id}`)
    .once('value')
    .then((snapshot) => snapshot.val())
    .catch((error) => {
      throw error;
    });

  // 1. Validate if assistant exists
  if (!assistant) {
    throw new Error('Assistant not found');
  }
  // 2. Validate if assistant is associated with the doctor performing the request

  // @ts-ignore
  if (assistant.doctorId !== req.user.uid) {
    throw new Error('Invalid request');
  }

  return assistant;
};

authRouter.route('/assistant')
/**
 * Create a new assistant for the doctor performing the request
 * */
  .post(
    validateFirebaseIdToken,
    async (req: Request, res: Response) => {
      try {
        const {
          email,
          ...rest
        } = req.body;

        // 1. Check if a doctor is performing the request
        // @ts-ignore
        const doctor = await fbAdmin.database().ref(`/doctors/${req.user.uid}`)
          .once('value')
          .then((snapshot) => snapshot.val())
          .catch((error) => {
            throw error;
          });

        if (!doctor) {
          throw new Error('Doctor not found');
        }

        // 2. Generate initial assistant password
        const password = new Chance().string({
          length: 14,
        });

        // 3. Create the assistant auth account
        const user = await fbAdmin.auth().createUser({email, password});
        const userId = user.uid;

        // 4. Send verification email to assistant - should include password
        const userVerificationLink = await fbAdmin.auth().generateEmailVerificationLink(email);
        const html = getEmailTemplateByFileName('assistantCreation.pug', {
          doctor: `${doctor.firstName} ${doctor.lastName}`,
          link: userVerificationLink,
          password,
        });
        await sendEmail({
          to: email,
          from: 'noreply@wellbeing.com',
          subject: 'Verify your email',
          html,
        });

        await fbAdmin.database().ref(`/users/${userId}`).set({role: 'assistant'});

        // 5. Add assistant to the 'assistants' db
        await fbAdmin.database().ref(`/assistants/` + userId).set({
          ...rest,
          // @ts-ignore
          doctorId: req.user.uid,
        });

        res.json({
          userId,
        });
      } catch (e) {
        functions.logger.error('Failed', e);

        res
          .status(500)
          .json({message: 'Failed to register user'});
      }
    },
  );


authRouter.route('/assistant/:id')
  /**
   * Update doctor assistant
   * */
  .put(
    validateFirebaseIdToken,
    async (req: Request, res: Response) => {
      try {
        // 1. Validate doctor/assistant
        await getDoctorAssistant(req);

        await fbAdmin.database().ref(`/assistants/${req.params.id}`).set({
          ...req.body,
        });

        res.json({success: true});
      } catch (e) {
        functions.logger.error('Failed', e);

        res
          .status(500)
          .json({message: 'Failed to remove assistant'});
      }
    },
  )
  /**
   * Removes a particular assistant from the database
   * */
  .delete(
    validateFirebaseIdToken,
    async (req: Request, res: Response) => {
      try {
        // 1. Validate doctor/assistant
        await getDoctorAssistant(req);

        // 2. Remove the assistant from the 'assistants' DB
        await fbAdmin.database().ref(`/assistants/${req.params.id}`).remove();

        // 3. Remove the assistant account from firebase auth
        // @ts-ignore
        await fbAdmin.auth().deleteUser(req.params.id);

        res.json({success: true});
      } catch (e) {
        functions.logger.error('Failed', e);

        res
          .status(500)
          .json({message: 'Failed to remove assistant'});
      }
    },
  );

export default authRouter;

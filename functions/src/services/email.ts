import * as sgMailer from '@sendgrid/mail';
import * as pug from 'pug';
import { resolve } from 'path';

sgMailer.setApiKey('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')

export const getEmailTemplateByFileName = (fileName: string, options: any) => {
  const templatePath = resolve( 'src', 'resources', 'emailTemplates', fileName);
  const compile = pug.compileFile(templatePath);

  return compile(options);
};

export const sendEmail = (message: any) => sgMailer.send(message);

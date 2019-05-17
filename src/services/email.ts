import config from '../../config/index';
import { IEmailRequest, IEmailTransportRequest } from '../interfaces/index';
import { validate, validateEmailShouldBeUnique } from '../validations/index';
import * as emailTransportService from './email-server-manager';
import * as joiSchema from '../validations/schemas/index';

export const sendEmail = async (payload: IEmailRequest): Promise<void> => {
  payload = validate(payload, joiSchema.sendEmail);

  // Joi cannot handle this validation
  // Email should be unique accross to,cc and  bcc
  validateEmailShouldBeUnique(payload.to, payload.cc, payload.bcc);

  const emailTransportPayload: IEmailTransportRequest = {
    from: config.email.fromEmail,
    ...payload,
  };
  await emailTransportService.sendEmail(emailTransportPayload);
};

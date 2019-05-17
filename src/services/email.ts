import config from '../../config/index';
import { IEmailRequest, IEmailTransportRequest } from '../interfaces/index';
import * as joiSchema from '../validations/schemas/index';
import { validate } from '../validations/index';
import * as emailTransportService from './email-transport';

export const sendEmail = async (payload: IEmailRequest): Promise<void> => {
  validate(payload, joiSchema.sendEmail);
  const emailTransportPayload: IEmailTransportRequest = {
    from: config.email.fromEmail,
    ...payload,
  };
  await emailTransportService.sendEmail(emailTransportPayload);
};

import config from '../../config/index';
import { IEmailTransportRequest } from '../interfaces/index';
import { SendGrid } from '../utils/SendGrid';
import { MailGun } from '../utils/MailGun';
import * as Boom from 'boom';

export const sendEmail = async (payload: IEmailTransportRequest): Promise<void> => {
  try {
    const sendgrid = new SendGrid(config.email.sendgridAPIKey);
    await sendgrid.sendEmail(payload);
  } catch (error) {
    if (error.output && error.output.statusCode >= 500) {
      await sendEmailFromFailover(payload);
    } else {
      throw error;
    }
  }
};

export const sendEmailFromFailover = async (payload: IEmailTransportRequest): Promise<void> => {
  try {
    const mailgun = new MailGun(config.email.mailgunAPIKey, config.email.mailgunDOMAIN);
    await mailgun.sendEmail(payload);
  } catch (error) {
    throw Boom.internal();
  }
};

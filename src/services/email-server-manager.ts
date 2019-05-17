import config from '../../config/index';
import { IEmailTransportRequest } from '../interfaces/index';
import { SendGrid } from '../classes/SendGrid';
import { MailGun } from '../classes/MailGun';
import * as Boom from 'boom';
import * as NodeCache from 'node-cache';

// Ideally should be cached in central cache like redis
const emailServerCache = new NodeCache();
const cacheKey = 'isPrimaryDown';

export const sendEmail = async (payload: IEmailTransportRequest): Promise<void> => {
  try {
    const isPrimaryDown = !!emailServerCache.get(cacheKey);
    if (!isPrimaryDown) {
      await sendEmailFromPrimaryServer(payload);
    } else {
      await sendEmailFromSecondaryServer(payload);
    }
  } catch (error) {
    throw Boom.serverUnavailable();
  }
};

export const sendEmailFromPrimaryServer = async (
  payload: IEmailTransportRequest,
): Promise<void> => {
  try {
    const sendgrid = new SendGrid(config.email.sendgridAPIKey);
    await sendgrid.sendEmail(payload);
  } catch (error) {
    console.error(error);
    // deactivate primary email server for few minutes
    emailServerCache.set(cacheKey, true, 600);
    await sendEmailFromSecondaryServer(payload);
  }
};

export const sendEmailFromSecondaryServer = async (
  payload: IEmailTransportRequest,
): Promise<void> => {
  try {
    const mailgun = new MailGun(config.email.mailgunAPIKey, config.email.mailgunDOMAIN);
    await mailgun.sendEmail(payload);
  } catch (error) {
    console.error(error);
    throw Boom.serverUnavailable('Secondary Unavailable');
  }
};

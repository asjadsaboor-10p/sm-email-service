import { Context } from 'koa';
import * as emailService from '../services/email';
import { IEmailRequest } from '../interfaces/email';

export const sendEmail = async (ctx: Context, next: () => void) => {
  const payload: IEmailRequest = {
    to: ctx.request.body.to,
    cc: ctx.request.body.cc,
    bcc: ctx.request.body.bcc,
    subject: ctx.request.body.subject,
    body: ctx.request.body.body,
  };
  await emailService.sendEmail(payload);
  ctx.state.message = 'success';
  await next();
};

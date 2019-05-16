import { Context } from 'koa';
import * as emailService from '../services/email';

export const sendEmail = async (ctx: Context, next: () => void) => {
  await emailService.sendEmail(ctx.request.body);
  ctx.state.message = 'success';
  await next();
};

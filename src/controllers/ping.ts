import { Context } from 'koa';

export const ping = async (ctx: Context, next: () => void) => {
  ctx.state.message = 'success';
  ctx.state.data = `pong!`;
  await next();
};

import { Context, Next } from 'hono';

export function authenticationHandler(security: object[]) {
  return async function jwtMiddleware(
    ctx: Context,
    next: Next,
  ): Promise<Response | undefined> {
    const testHeader = ctx.req.header('test');
    if (testHeader !== 'test') {
      return ctx.text('Unauthorized', 403);
    }

    await next();
  };
}

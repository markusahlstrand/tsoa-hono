import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';

export function authenticationHandler(security: object[]) {
  return async function jwtMiddleware(ctx: Context, next: Next) {
    const testHeader = ctx.req.header('test');
    if (testHeader !== 'test') {
      throw new HTTPException(403, { message: 'Unauthorized' });
    }

    return next();
  };
}

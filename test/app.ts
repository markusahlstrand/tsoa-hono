import { Hono } from 'hono';
import { RegisterRoutes } from './build/routes';

export type Env = {
  test: 'test';
};

export type Var = {
  test: 'test';
};

export const app = new Hono<{ Bindings: Env; Var: Var }>().get(
  '/hono',
  async (ctx) => ctx.text('Hono router'),
);

// @ts-ignore
const tsoaApp = RegisterRoutes<typeof app>(app);
export default tsoaApp;

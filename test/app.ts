import { Hono } from 'hono';
import { RegisterRoutes } from './build/routes';

export type Env = {
  test: 'test';
};

export type Var = {
  test: 'test';
};

const app = new Hono<{ Bindings: Env; Var: Var }>();

app.get('/hono', async (ctx) => ctx.text('Hono router'));

RegisterRoutes<{ Bindings: Env; Var: Var }>(app);

export default app;

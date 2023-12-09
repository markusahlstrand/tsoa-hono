import { testClient } from 'hono/testing';
import tsoaApp, { app } from './app';

describe('honoTesting', () => {
  describe('raw test', () => {
    it('should should return a raw hono request', async () => {
      const response = await testClient(app).hono.$get();
      expect(response.status).toBe(200);
      const body = await response.text();
      expect(body).toBe('Hono router');
    });
  });

  describe('basic test', () => {
    it('should should return get request', async () => {
      const response = await testClient(tsoaApp).basic.$get();

      const body = await response.text();
      expect(body).toBe('OK');
      expect(response.status).toBe(200);
    });

    it('should should return the body from a post request', async () => {
      // TODO: passing the body as json which isn't really correct
      const response = await testClient(tsoaApp).basic.$post(
        {
          json: 'test',
        },
        // {
        //   headers: {
        //     'content-type': 'text/plain',
        //   },
        // },
      );

      const body = await response.text();
      expect(body).toBe('test');
      expect(response.status).toBe(200);
    });

    it('should should return the body from a put request', async () => {
      // TODO: passing the body as json which isn't really correct
      const response = await testClient(tsoaApp).basic.$put(
        {
          json: 'test',
        },
        // {
        //   headers: {
        //     'content-type': 'text/plain',
        //   },
        // },
      );

      const body = await response.text();
      expect(body).toBe('test');
      expect(response.status).toBe(200);
    });

    it('should should return the body from a patch request', async () => {
      // TODO: passing the body as json which isn't really correct
      const response = await testClient(tsoaApp).basic.$patch(
        {
          json: 'test',
        },
        // {
        //   headers: {
        //     'content-type': 'text/plain',
        //   },
        // },
      );

      const body = await response.text();
      expect(body).toBe('test');
      expect(response.status).toBe(200);
    });

    it('should should return a string from a delete request', async () => {
      const response = await testClient(tsoaApp).basic.$delete();

      const body = await response.text();
      expect(body).toBe('OK');
      expect(response.status).toBe(200);
    });
  });

  describe('path parameters', () => {
    it('should fetch a string from the path', async () => {
      const response = await testClient(tsoaApp).basic.param[':id'].$get({
        param: { id: 'test' },
      });

      const body = await response.text();
      expect(body).toBe('test');
      expect(response.status).toBe(200);
    });
  });

  describe('query parameters', () => {
    it('should fetch a string from the querystring', async () => {
      const response = await testClient(tsoaApp).basic.query.$get({
        query: { foo: 'bar' },
      });

      const body = await response.text();
      expect(body).toBe('bar');
      expect(response.status).toBe(200);
    });

    it('should return undefined fo a non exisitng querystring', async () => {
      const response = await testClient(tsoaApp).basic.query.$get();

      const body = await response.text();
      expect(body).toBe('No foo');
      expect(response.status).toBe(200);
    });
  });

  describe('headers', () => {
    it('should fetch a string from the querystring', async () => {
      const response = await testClient(tsoaApp).basic.header.$get(
        {},
        {
          headers: {
            foo: 'bar',
          },
        },
      );

      const body = await response.text();
      expect(body).toBe('bar');
      expect(response.status).toBe(200);
    });

    it('should return undefined fo a non exisitng header', async () => {
      const response = await testClient(tsoaApp).basic.header.$get();

      const body = await response.text();
      expect(body).toBe('No foo');
      expect(response.status).toBe(200);
    });

    it('should set a header in the response', async () => {
      const response = await testClient(tsoaApp).basic.header.$get(
        {},
        {
          headers: {
            foo: 'bar',
          },
        },
      );

      expect(response.headers.get('foo')).toBe('bar');
    });
  });

  describe('body', () => {
    it('should pass json as body', async () => {
      const fooBody = {
        foo: 'bar',
      };

      const response = await testClient(tsoaApp).basic['json-body'].$post(
        {
          json: fooBody,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );

      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body).toEqual(fooBody);
    });

    it.skip('should pass x-www-form-urlencoded as body', async () => {
      const fooBody = {
        foo: 'bar',
      };

      const response = await testClient(tsoaApp).basic['www-form-body'].$post(
        {
          formData: fooBody,
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        },
      );

      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body).toEqual(fooBody);
    });
  });

  describe('auth', () => {
    it('should return a 403 for a unauthorized request', async () => {
      const response = await testClient(tsoaApp).basic.auth.$get();

      expect(response.status).toBe(403);

      const body = await response.text();
      expect(body).toBe('Unauthorized');
    });

    it('should return a 200 for a authorized request', async () => {
      const response = await testClient(tsoaApp).basic.auth.$get(
        {},
        {
          headers: {
            test: 'test',
          },
        },
      );

      expect(response.status).toBe(200);

      const body = await response.text();
      expect(body).toBe('OK');
    });
  });

  describe('rediret', () => {
    it('should return a redirect', async () => {
      const response = await testClient(tsoaApp).basic.redirect.$get();

      expect(response.status).toBe(302);

      const body = await response.text();
      expect(body).toBe('Redirect to google');
    });
  });
});

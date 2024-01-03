# tsoa-hono

`tsoa-hono` is an npm library that integrates `tsoa` with the `hono` router. With this library, you can run `tsoa` seamlessly in a variety of environments, such as Node.js, Cloudflare Workers, Deno, and AWS Edge Lambdas.

## Features

- Provides a template file for easy setup and integration of `tsoa` with the `hono` router.
- Supports a wide range of environments, ensuring versatility and adaptability.

The `tsoa-hono` uses the fluent API from `hono` that returns a typed router. This allows you to use the output of the RegisterRoutes function with the `hono/testing` library:

```typescript
const app = new Hono();
const tsoaApp = RegisterRoutes<typeof app>(app);

const response = await testClient(tsoaApp).basic.$get();

const body = await response.text();
```

## Installation

Install via npm:

```bash
npm install tsoa-hono
```

## Setup

1. Ensure you have a `tsoa` configuration file (`tsoa.json`) in your project root. If not, create one.
2. Add or modify the configuration as follows:

```json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*Controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build",
    "middlewareTemplate": "node_modules/tsoa-hono/hono-router.hbs"
  }
}
```

- `entryFile`: The main entry file for your application.
- `noImplicitAdditionalProperties`: Control how additional properties in the request body are treated.
- `controllerPathGlobs`: A pattern to find your controllers.
- `spec`: Specifications related to your API.
- `routes`: Configuration for your route generation.

## Usage

Once the `tsoa.json` configuration is set up, run your `tsoa` command as you normally would. The integration with the `hono` router will be handled by the library using the provided template.

### Middlewares

The middlewares are based on hono and return a Response object. As the hono Next function doesn't return anything according to the Typescript definition, the tsoa-hono library uses a different Typescript type for the Next function that is part of the package.

```typescript
async function customMiddleware(ctx: Context, next: Next) {
  const response = await next();

  response.headers.set('customMiddleware', 'true');
  return response;
}
```

## Support

If you encounter any issues or have questions related to the library, please refer to our [GitHub repository]().

## License

MIT

---

We hope `tsoa-hono` helps streamline your development process!

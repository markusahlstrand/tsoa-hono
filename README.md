# tsoa-hono

`tsoa-hono` is an npm library that integrates `tsoa` with the `hono` router. With this library, you can run `tsoa` seamlessly in a variety of environments, such as Node.js, Cloudflare Workers, Deno, and AWS Edge Lambdas.

## Features

- Provides a template file for easy setup and integration of `tsoa` with the `hono` router.
- Supports a wide range of environments, ensuring versatility and adaptability.

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

## Support

If you encounter any issues or have questions related to the library, please refer to our [GitHub repository]().

## License

MIT

---

We hope `tsoa-hono` helps streamline your development process!

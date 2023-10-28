import {
  Controller,
  Delete,
  Get,
  Header,
  Post,
  Path,
  Body,
  Patch,
  Put,
  Query,
  Route,
  Security,
} from '@tsoa/runtime';

interface FooBody {
  foo: string;
}

@Route('basic')
export class BasicController extends Controller {
  @Get('')
  public async basicGet() {
    return 'OK';
  }

  @Get('param/{id}')
  public async basicGetWithParam(@Path('id') id: string) {
    return id;
  }

  @Get('query')
  public async basicGetWithQuery(@Query('foo') foo?: string) {
    return foo || 'No foo';
  }

  @Get('header')
  public async basicGetWithHeader(@Header('foo') foo?: string) {
    if (foo) {
      this.setHeader('foo', foo);
    }

    return foo || 'No foo';
  }

  @Get('redirect')
  public async basicRedirect() {
    this.setStatus(302);
    this.setHeader('location', 'https://www.google.com');
    return 'Redirect to google';
  }

  @Post('')
  public async basicPost(@Body() body: string) {
    return body;
  }

  @Put('')
  public async basicPut(@Body() body: string) {
    return body;
  }

  @Patch('')
  public async basicPatch(@Body() body: string) {
    return body;
  }

  @Delete('')
  public async basicDelete() {
    return 'OK';
  }

  @Post('json-body')
  public async basicPostWithJsonBody(@Body() foo: FooBody) {
    return foo;
  }

  @Post('www-form-body')
  public async basicPostWithWwwFormBody(@Body() foo: FooBody) {
    return foo;
  }

  @Get('auth')
  @Security('api', [''])
  public async basicGetWithAuth() {
    return 'OK';
  }
}

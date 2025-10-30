import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let server: any;

export default async function handler(req: any, res: any) {
  if (!server) {
    const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
    await app.init();
    server = app.getHttpAdapter().getInstance();
  }
  return server(req, res);
}

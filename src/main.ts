import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

// Allow only your client + local dev
  const allowlist = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
  ].filter(Boolean) as string[];

  app.enableCors({
  origin: ['http://localhost:5173', process.env.CLIENT_URL].filter(Boolean) as string[],
  methods: ['GET','POST','PATCH','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept','Origin'],
  credentials: false,
  optionsSuccessStatus: 204,
});

  // Global prefix
  app.setGlobalPrefix('api');

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { VersioningType } from '@nestjs/common';

let server: any;

export default async function handler(req: any, res: any) {
  if (!server) {
    const app = await NestFactory.create(AppModule, { cors: false });

    // CORS
    app.enableCors({
      origin: [process.env.CLIENT_URL, 'http://localhost:5173'], 
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    
    // Add global prefix
    app.setGlobalPrefix('api');
    
    // Add versioning
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1'
    });
    
    await app.init();
    server = app.getHttpAdapter().getInstance();
  }
  return server(req, res);
}

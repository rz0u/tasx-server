import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const dbUrl = process.env.POSTGRES_URL

        // if running in Vercel (Neon)
        if (dbUrl) {
          return {
            type: 'postgres',
            url: dbUrl,
            entities: [Task],
            synchronize: false,
            ssl: {rejectUnauthorized: false},
            extra: {sslmode: 'require'}
          }
        }

        // local fallback (Docker Postgres)
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT || 5432),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          entities:[Task],
          synchronize: false
        }
      }
    }),
    TaskModule
  ],
  controllers: [AppController]
})
export class AppModule {}

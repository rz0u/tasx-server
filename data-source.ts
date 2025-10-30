import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Task } from 'src/task/task.entity';

const url = process.env.POSTGRES_URL || '';

export default new DataSource({
  type: 'postgres',
  url,
  entities: [Task],
  migrations: ['src/migrations/*.js'],
  ssl: { rejectUnauthorized: false },
  extra: { sslmode: 'require' },
  logging: true
});

import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const dataSource = new DataSource({
  type: 'sqlite',
  // host: process.env.DATABASE_HOST,
  // timezone: 'Asia/Seoul',
  // port: parseInt(process.env.DATABASE_PORT || '3306'),
  // username: process.env.DATABASE_USERNAME,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_DB,
  database: 'test.db',
  migrations: [__dirname + '/migrations/*.{ts,js}']
});

export default dataSource;
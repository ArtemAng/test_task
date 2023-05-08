import { type DataSourceOptions } from 'typeorm';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL
};

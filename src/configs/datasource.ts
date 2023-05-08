import { DataSource } from 'typeorm';

import { ormConfig } from './orm.config';

export const dataSource = new DataSource({
  ...ormConfig,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  entities: ['src/entities/*.ts']
});

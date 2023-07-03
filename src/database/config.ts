import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'test.db',
  autoLoadEntities: true,
  logging: true
};

export default ormConfig;
import { Module } from '@nestjs/common';
import ormConfig from './config';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeorm = TypeOrmModule.forRoot(ormConfig);

@Module({
  imports: [typeorm]
})
export class DatabaseModule {}

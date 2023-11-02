import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { User } from './entities/user.entity';
import { DataSource } from './dataSource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DATABASE_HOST'),
          port: +(configService.get<number>('DATABASE_PORT') || 3306),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_DB'),
          entities: [join(configService.get('PWD'), 'dist/libs/database/src', 'entities/*.js')],
          migrations: [join(configService.get('PWD'), 'dist/libs/database/src', 'migrations/*.js')],
          autoLoadEntities: true,
          migrationsRun: true
        };
      },
      dataSourceFactory: async options => await new DataSource(options)
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}

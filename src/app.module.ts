import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from 'configs/config.module';
import { DatabaseModule } from 'database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';
import { UserModule } from 'routes/user/user.module';
import { RouterModule } from '@nestjs/core';

@Global()
@Module({
  imports: [
    /* config */
    ConfigurationModule,
    
    /* database */
    DatabaseModule,
    TypeOrmModule.forFeature([
      User
    ]),

    /* routes */
    UserModule,
    RouterModule.register([
      { path: 'user', module: UserModule }
    ])
  ],
  controllers: [/* AppController */],
  providers: [/* AppService */],
  exports: [TypeOrmModule]
})
export class AppModule {}

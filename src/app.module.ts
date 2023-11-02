import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database';
import { ConfigurationModule } from './configs/config.module';
import { UserModule } from './routes/user/user.module';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigurationModule,
    JwtModule,
    DatabaseModule,

    /* routes */
    UserModule,
    RouterModule.register([
      { path: 'user', module: UserModule }
    ])
  ]
})
export class AppModule {}

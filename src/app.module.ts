import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config.module';
import { MemberModule } from './routes/member/member.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { homedir } from 'os';

@Module({
  imports: [
    ConfigurationModule,
    ServeStaticModule.forRoot({
      rootPath: join(homedir(), 'framer'),
      serveRoot: '/file',
    }),

    /* routes */
    MemberModule,
  ],
})
export class AppModule {
}

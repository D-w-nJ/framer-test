import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { ServiceExceptionFilter } from './global/exception/service-exception.filter';
import { ResponseInterceptor } from './global/interceptors/response.interceptor';
import { ConfigService } from '@nestjs/config';

const urlPrefix = 'api';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(urlPrefix);
  app.enableVersioning({ type: VersioningType.URI });
  
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ServiceExceptionFilter());
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  /* swagger */
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Nest.js API')
      .setDescription('API Documentation')
      .setVersion('1.0.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header'
      }, 'accessToken')
      .build()
  );
  SwaggerModule.setup('api-docs', app, document, { swaggerOptions: { persistAuthorization: true } });

  /* helmet */
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  
  /* cors */
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT')) || 5000;

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

bootstrap();

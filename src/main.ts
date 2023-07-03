import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { ResponseInterceptor } from 'global/interceptors/response.interceptor';

const urlPrefix = 'api';
const port = process.env.PORT || 5000;

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(urlPrefix);
  
  app.enableVersioning({ type: VersioningType.URI });
  
  app.useGlobalInterceptors(new ResponseInterceptor());
  
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

  await app.listen(process.env.PORT || 5000);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
};

bootstrap();

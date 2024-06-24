import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerInit } from './utils/swagger.config';
import { ValidationPipe } from '@nestjs/common';

const PORT = +process.env.APP_PORT;
const ENV = process.env.APP_ENV;
const PREFIX = process.env.APP_PREFIX;
const SWAGGER_UI = process.env.APP_SWAGGER_UI === 'true';
const TITLE = process.env.APP_TITLE;
const DESCRIPTION = process.env.APP_DESCRIPTION;
const VERSION = process.env.APP_VERSION;
const URL_PREFIX_COMPLETE = `${PREFIX}/${VERSION}/`;
const SECURITY_ALLOWED_ORIGINS = process.env.APP_ALLOWED_ORIGINS;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(VERSION)
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(URL_PREFIX_COMPLETE, app, document, {
    customSiteTitle: TITLE,
    url: URL_PREFIX_COMPLETE,
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      displayRequestDuration: true,
    }
  });
  const allowedOrigins = SECURITY_ALLOWED_ORIGINS.split(';');
  app.enableCors({
      origin: (origin, resolve) => {
          if (allowedOrigins.includes(origin)) return resolve(null, true);

          return resolve(null, false);
      },
      credentials: true
  });
  app.setGlobalPrefix(PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        transform: true,
        stopAtFirstError: true
    })
  );
  app.enableVersioning();
  if (SWAGGER_UI && ENV === 'development') swaggerInit(app);
  await app.listen(
    PORT,
      () =>
          console.log(
              `\n \x1B[32m➜\x1B[0m Local: \x1B[36mhttp://localhost:${PORT}/${PREFIX}`
          )
  );
}
bootstrap();

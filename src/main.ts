import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Nest Application')
    .setDescription("Nest API Application")
    .setVersion('v1')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api/v1/', app, document, {
    customSiteTitle: 'API NEST POSTS',
    url: 'api/v1/',
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      displayRequestDuration: true,
    }
  });
  app.enableCors();
  app.setGlobalPrefix('api')
  app.enableVersioning();
  await app.listen(parseInt(process.env.APP_PORT, 10) || 3001);
}
bootstrap();

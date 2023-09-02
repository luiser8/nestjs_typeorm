import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('Users Application')
    .setDescription("Users API Application")
    .setVersion('v1')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API NEST POSTS',
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      displayRequestDuration: true
    }
  });
  app.enableCors();
  app.setGlobalPrefix('api')
  app.enableVersioning();
  await app.listen(parseInt(process.env.APP_PORT, 10) || 3001);
}
bootstrap();

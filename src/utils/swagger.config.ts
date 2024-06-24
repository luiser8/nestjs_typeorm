import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerInit = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle(process.env.APP_TITLE)
        .setDescription(process.env.APP_DESCRIPTION)
        .addBearerAuth()
        .setVersion(process.env.APP_VERSION)
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(process.env.APP_PREFIX, app, document, {
        customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-flattop.css',
        customfavIcon: '',
        customSiteTitle: process.env.APP_TITLE,
        swaggerOptions: {
            persistAuthorization: true,
            tryItOutEnabled: true,
            displayRequestDuration: true
        }
    });
};

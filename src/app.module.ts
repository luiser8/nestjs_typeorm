import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';
import configuration from 'config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      username: 'root',
      password: '@lerDev.m',
      port: 3306,
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.APP_EMAIL_HOST,
        port: process.env.APP_EMAIL_PORT,
        auth: {
          user: process.env.APP_EMAIL_USER,
          pass: process.env.APP_EMAIL_PASS,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
    RoleModule,
    ProfileModule,
    PostsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

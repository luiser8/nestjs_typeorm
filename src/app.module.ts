import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './auth/constants';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expire },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.APP_DB_HOST,
      username: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASS as string,
      port: process.env.APP_DB_PORT as any,
      database: process.env.APP_DB_DBNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.APP_DB_SYNCHRONIZE as any,
      autoLoadEntities: process.env.APP_DB_AUTOLOADENTITIES as any,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.APP_EMAIL_HOST,
        port: process.env.APP_EMAIL_PORT,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: process.env.APP_EMAIL_USER,
          pass: process.env.APP_EMAIL_PASS,
        },
      },
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

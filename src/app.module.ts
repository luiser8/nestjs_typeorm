import { Module } from '@nestjs/common';
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
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cjp9hr61208c73ff0gcg-a',
      username: 'nest_posts_user',
      password: 'q0t0TuVMVvgvYrJNAuXSbvpDfprTPS4F',
      port: 5432,
      database: 'nest_posts_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      // type: 'postgres',
      // host: 'localhost',
      // username: 'postgresUser',
      // password: '@lerDev.pg',
      // port: 5432,
      // database: 'nestjs',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
      // autoLoadEntities: true,
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

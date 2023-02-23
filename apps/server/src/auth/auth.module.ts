import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RefreshStrategy } from './refresh.strategy';
import { AuthResolver } from './auth.resolver';
import { SETTINGS } from 'src/common/consts';
import { MailerService } from 'src/mailer/mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: SETTINGS.JWT_EXPIRATION },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    MailerService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    AuthResolver,
  ],
})
export class AuthModule { }

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserJwtPayload } from './interfaces/userPayload';
import { UsersService } from 'src/users/users.service';
import { User as UserType } from 'db';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private userService: UsersService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RefreshStrategy.extractJWT]),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  private static extractJWT(req: Request): string | null {
    const authCookie = req.cookies['auth-cookie'];

    if (authCookie && authCookie.token) {
      return authCookie.token;
    }
    return null;
  }

  async validate(req: Request, payload: UserJwtPayload): Promise<UserType> {
    if (!payload) {
      throw new BadRequestException('Invalid JWT token');
    }
    const authCookie = req.cookies['auth-cookie'];

    if (
      !authCookie?.refreshToken ||
      typeof authCookie.refreshToken !== 'string'
    ) {
      throw new BadRequestException('Invalid refresh token');
    }

    const user = await this.userService.validateRefreshToken(
      {
        id: payload.sub,
      },
      authCookie.refreshToken,
    );

    return user;
  }
}

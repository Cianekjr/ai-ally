import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserJwtPayload } from './interfaces/userPayload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
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

  validate(payload: UserJwtPayload): UserJwtPayload | null {
    if (!payload.email || !payload.sub) {
      return null;
    }
    return payload;
  }
}

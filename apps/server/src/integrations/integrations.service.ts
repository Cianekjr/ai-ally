import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_ROUTES } from './helpers/consts';
import {
  LongAccessTokenResponse,
  ShortAccessTokenResponse,
} from './interfaces/instagram';

const ROUTES = {
  SHORT_ACCESS_TOKEN: 'https://api.instagram.com/oauth/access_token',
  LONG_ACCESS_TOKEN: 'https://graph.instagram.com/access_token',
};

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async requestShortAccessToken(
    code: string,
  ): Promise<ShortAccessTokenResponse> {
    try {
      return await lastValueFrom(
        this.httpService
          .post<ShortAccessTokenResponse>(
            ROUTES.SHORT_ACCESS_TOKEN,
            new URLSearchParams({
              client_id: process.env.INSTAGRAM_CLIENT_ID || '',
              client_secret: process.env.INSTAGRAM_CLIENT_SECRET || '',
              code,
              grant_type: 'authorization_code',
              redirect_uri: `${process.env.APP_PUBLIC_URL}${APP_ROUTES.OAUTH_INSTAGRAM}`,
            }),
          )
          .pipe(map((res) => res.data)),
      );
    } catch (e: unknown) {
      console.log(e, 1);
      throw new Error();
    }
  }

  async requestLongAccessToken(
    shortAccessToken: string,
  ): Promise<LongAccessTokenResponse> {
    try {
      return await lastValueFrom(
        this.httpService
          .get<LongAccessTokenResponse>(ROUTES.LONG_ACCESS_TOKEN, {
            params: {
              client_secret: process.env.INSTAGRAM_CLIENT_SECRET || '',
              access_token: shortAccessToken,
              grant_type: 'ig_exchange_token',
            },
          })
          .pipe(map((res) => res.data)),
      );
    } catch (e: unknown) {
      throw new Error();
    }
  }
}

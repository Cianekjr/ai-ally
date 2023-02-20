import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { UserJwtPayload } from 'src/auth/interfaces/userPayload';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateIntegrationInput } from './models/createIntegration.input';
import { CurrentUser } from 'src/auth/decorators/currentUser';

@Resolver(() => String)
export class IntegrationsResolver {
  constructor(private integrationsService: IntegrationsService) {}

  // https://graph.instagram.com/refresh_access_token?grant_type = ig_refresh_token&access_token={ long - lived - access - token }
  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async createIntegration(
    @Args('input') data: CreateIntegrationInput,
    @CurrentUser() user: UserJwtPayload,
  ) {
    try {
      const { code } = data;
      const userId = user.sub;
      console.log(code, userId);

      const shortAccessTokenResponse =
        await this.integrationsService.requestShortAccessToken(code);

      const longAccessTokenResponse =
        await this.integrationsService.requestLongAccessToken(
          shortAccessTokenResponse.access_token,
        );
      console.log(longAccessTokenResponse);

      // longAccessTokenResponse.access_token
      // longAccessTokenResponse.expires_in

      return 'ok';
    } catch (e) {
      // console.log(e);
    }
  }
}

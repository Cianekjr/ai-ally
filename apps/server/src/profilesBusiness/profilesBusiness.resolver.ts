import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProfileBusinessModel } from './models/profileBusiness.model';
import { CreateProfileBusinessInput } from './models/createProfileBusiness.input';
import { CurrentUser } from 'src/auth/decorators/currentUser';
import { ProfilesBusinessService } from './profilesBusiness.service';
import { UserJwtPayload } from 'src/auth/interfaces/userPayload';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileBusinessInput } from './models/updateProfileBusiness.input';

@Resolver(() => ProfileBusinessModel)
export class ProfilesBusinessResolver {
  constructor(private profilesBusinessService: ProfilesBusinessService) {}

  @Query(() => ProfileBusinessModel)
  @UseGuards(JwtAuthGuard)
  getProfileBusiness(@CurrentUser() user: UserJwtPayload) {
    const userId = user.sub;

    return this.profilesBusinessService.getProfileBusiness({ userId });
  }

  @Mutation(() => ProfileBusinessModel)
  @UseGuards(JwtAuthGuard)
  async createProfileBusiness(
    @Args('input') data: CreateProfileBusinessInput,
    @CurrentUser() user: UserJwtPayload,
  ) {
    const userId = user.sub;

    const profileBusiness =
      await this.profilesBusinessService.createProfileBusiness({
        ...data,
        user: { connect: { id: userId } },
      });

    return profileBusiness;
  }

  @Mutation(() => ProfileBusinessModel)
  @UseGuards(JwtAuthGuard)
  async updateProfileBusiness(
    @Args('input') data: UpdateProfileBusinessInput,
    @CurrentUser() user: UserJwtPayload,
  ) {
    const userId = user.sub;

    const profileBusiness =
      await this.profilesBusinessService.updateProfileBusiness(
        { userId },
        {
          ...data,
        },
      );

    return profileBusiness;
  }
}

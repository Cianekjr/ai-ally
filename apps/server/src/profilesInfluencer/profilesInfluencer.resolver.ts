import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProfileInfluencerModel } from './models/profileInfluencer.model';
import { CreateProfileInfluencerInput } from './models/createProfileInfluencer.input';
import { CurrentUser } from 'src/auth/decorators/currentUser';
import { ProfilesInfluencerService } from './profilesInfluencer.service';
import { UserJwtPayload } from 'src/auth/interfaces/userPayload';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileInfluencerInput } from './models/updateProfileInfluencer.input';

@Resolver(() => ProfileInfluencerModel)
export class ProfilesInfluencerResolver {
  constructor(private profilesInfluencerService: ProfilesInfluencerService) {}

  @Query(() => ProfileInfluencerModel)
  @UseGuards(JwtAuthGuard)
  getProfileInfluencer(@CurrentUser() user: UserJwtPayload) {
    const userId = user.sub;

    return this.profilesInfluencerService.getProfileInfluencer({ userId });
  }

  @Mutation(() => ProfileInfluencerModel)
  @UseGuards(JwtAuthGuard)
  async createProfileInfluencer(
    @Args('input') data: CreateProfileInfluencerInput,
    @CurrentUser() user: UserJwtPayload,
  ) {
    const userId = user.sub;

    const profileInfluencer =
      await this.profilesInfluencerService.createProfileInfluencer({
        ...data,
        user: { connect: { id: userId } },
      });

    return profileInfluencer;
  }

  @Mutation(() => ProfileInfluencerModel)
  @UseGuards(JwtAuthGuard)
  async updateProfileInfluencer(
    @Args('input') data: UpdateProfileInfluencerInput,
    @CurrentUser() user: UserJwtPayload,
  ) {
    const userId = user.sub;

    const profileInfluencer =
      await this.profilesInfluencerService.updateProfileInfluencer(
        { userId },
        {
          ...data,
        },
      );

    return profileInfluencer;
  }
}

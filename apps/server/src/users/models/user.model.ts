import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  AccountType,
  ProfileInfluencer as ProfileInfluencerType,
  ProfileBusiness as ProfileBusinessType,
} from 'db';
import { ProfileBusinessModel } from 'src/profilesBusiness/models/profileBusiness.model';
import { ProfileInfluencerModel } from 'src/profilesInfluencer/models/profileInfluencer.model';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => AccountType)
  type: AccountType;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  refreshTokenExp?: Date;

  @Field({ nullable: true })
  confirmationToken?: string;

  @Field({ nullable: true })
  confirmationDate?: Date;

  @Field({ nullable: true })
  forgotPasswordToken?: string;

  @Field({ nullable: true })
  forgotPasswordDate?: Date;

  @Field(() => ProfileBusinessModel, { nullable: true })
  profileBusiness?: ProfileBusinessType;

  @Field(() => ProfileInfluencerModel, { nullable: true })
  profileInfluencer?: ProfileInfluencerType;
}

registerEnumType(AccountType, {
  name: 'AccountType',
});

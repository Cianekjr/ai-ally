import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  AccountType,
} from 'db';

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
}

registerEnumType(AccountType, {
  name: 'AccountType',
});

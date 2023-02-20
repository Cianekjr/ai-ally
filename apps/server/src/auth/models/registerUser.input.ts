import { Field, InputType } from '@nestjs/graphql';
import { AccountType } from 'db';
import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UserRegisterInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsEmail()
  @MaxLength(100)
  readonly email: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  readonly password: string;

  @Field(() => AccountType, { nullable: false })
  @IsEnum(AccountType)
  readonly type: AccountType;
}

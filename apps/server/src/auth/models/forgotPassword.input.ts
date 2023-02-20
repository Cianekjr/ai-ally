import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsEmail()
  readonly email: string;
}

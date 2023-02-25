import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UserLoginInput {
  @Field(() => String, { nullable: false })
  @IsString()
  readonly email: string

  @Field(() => String, { nullable: false })
  @IsString()
  readonly password: string
}

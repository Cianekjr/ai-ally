import { Field, InputType } from '@nestjs/graphql'
import { IsString, MaxLength, MinLength } from 'class-validator'

@InputType()
export class CreatePasswordInput {
  @Field(() => String, { nullable: false })
  @IsString()
  readonly forgotPasswordToken: string

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  readonly password: string
}

import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UserActivationInput {
  @Field(() => String, { nullable: false })
  @IsString()
  readonly token: string
}

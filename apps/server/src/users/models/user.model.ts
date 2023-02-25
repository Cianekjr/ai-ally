import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number

  @Field()
  email: string

  @Field()
  password: string

  @Field({ nullable: true })
  refreshToken?: string

  @Field({ nullable: true })
  refreshTokenExp?: Date

  @Field({ nullable: true })
  confirmationToken?: string

  @Field({ nullable: true })
  confirmationDate?: Date

  @Field({ nullable: true })
  forgotPasswordToken?: string

  @Field({ nullable: true })
  forgotPasswordDate?: Date
}

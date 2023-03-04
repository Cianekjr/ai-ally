import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ResultImageModel {
  @Field(() => Int)
  id: number

  @Field()
  messageId: string

  @Field()
  imageUrl: string

  @Field(() => Int, { nullable: true })
  width?: number

  @Field(() => Int, { nullable: true })
  height?: number

  @Field()
  content: string

  @Field({ nullable: true })
  messageUrl?: string
}

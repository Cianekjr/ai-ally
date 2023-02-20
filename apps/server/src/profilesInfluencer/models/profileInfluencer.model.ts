import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileInfluencerModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}

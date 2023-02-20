import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileBusinessModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}

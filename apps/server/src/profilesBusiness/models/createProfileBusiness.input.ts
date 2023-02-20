import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateProfileBusinessInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  readonly name: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  readonly description: string;
}

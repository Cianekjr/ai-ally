import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateProfileInfluencerInput {
  @Field(() => String, { nullable: false })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  readonly name: string;

  @Field(() => String, { nullable: false })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  readonly description: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateIntegrationInput {
  @Field(() => String, { nullable: false })
  @IsString()
  readonly code: string;
}

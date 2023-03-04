import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString, Max } from 'class-validator'

@InputType()
export class GetResultImagesInput {
  @Field(() => String, { nullable: false })
  @IsString()
  readonly content: string

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Max(100)
  @IsOptional()
  readonly take?: number

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  readonly cursor?: number
}

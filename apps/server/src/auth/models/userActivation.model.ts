import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ActivationStatus } from '../enums/activationStatuses'

@ObjectType()
export class UserActivationModel {
  @Field(() => ActivationStatus, { nullable: false })
  status: ActivationStatus
}

registerEnumType(ActivationStatus, {
  name: 'ActivationStatus',
})

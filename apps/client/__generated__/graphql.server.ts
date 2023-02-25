import { DocumentNode } from 'graphql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export enum ActivationStatus {
  Expired = 'EXPIRED',
  Invalid = 'INVALID',
  Success = 'SUCCESS',
  Used = 'USED',
}

export type CreatePasswordInput = {
  forgotPasswordToken: Scalars['String']
  password: Scalars['String']
}

export type ForgotPasswordInput = {
  email: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  activate: UserActivationModel
  createPassword: Scalars['String']
  forgotPassword: Scalars['String']
  login: UserModel
  register: UserModel
}

export type MutationActivateArgs = {
  input: UserActivationInput
}

export type MutationCreatePasswordArgs = {
  input: CreatePasswordInput
}

export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput
}

export type MutationLoginArgs = {
  input: UserLoginInput
}

export type MutationRegisterArgs = {
  input: UserRegisterInput
}

export type Query = {
  __typename?: 'Query'
  getProfile: UserModel
  logout: Scalars['String']
  regenerateTokens: Scalars['String']
}

export type UserActivationInput = {
  token: Scalars['String']
}

export type UserActivationModel = {
  __typename?: 'UserActivationModel'
  status: ActivationStatus
}

export type UserLoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type UserModel = {
  __typename?: 'UserModel'
  confirmationDate?: Maybe<Scalars['DateTime']>
  confirmationToken?: Maybe<Scalars['String']>
  email: Scalars['String']
  forgotPasswordDate?: Maybe<Scalars['DateTime']>
  forgotPasswordToken?: Maybe<Scalars['String']>
  id: Scalars['Int']
  password: Scalars['String']
  refreshToken?: Maybe<Scalars['String']>
  refreshTokenExp?: Maybe<Scalars['DateTime']>
}

export type UserRegisterInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type ActivateMutationVariables = Exact<{
  token: Scalars['String']
}>

export type ActivateMutation = { __typename?: 'Mutation'; activate: { __typename?: 'UserActivationModel'; status: ActivationStatus } }

export type CreatePasswordMutationVariables = Exact<{
  forgotPasswordToken: Scalars['String']
  password: Scalars['String']
}>

export type CreatePasswordMutation = { __typename?: 'Mutation'; createPassword: string }

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']
}>

export type ForgotPasswordMutation = { __typename?: 'Mutation'; forgotPassword: string }

export type GetProfileQueryVariables = Exact<{ [key: string]: never }>

export type GetProfileQuery = { __typename?: 'Query'; getProfile: { __typename?: 'UserModel'; id: number; email: string } }

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type LoginUserMutation = { __typename?: 'Mutation'; login: { __typename?: 'UserModel'; id: number; email: string } }

export type LogoutQueryVariables = Exact<{ [key: string]: never }>

export type LogoutQuery = { __typename?: 'Query'; logout: string }

export type RegenerateTokensQueryVariables = Exact<{ [key: string]: never }>

export type RegenerateTokensQuery = { __typename?: 'Query'; regenerateTokens: string }

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type RegisterUserMutation = { __typename?: 'Mutation'; register: { __typename?: 'UserModel'; id: number } }

export const ActivateDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'activate' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'activate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [{ kind: 'ObjectField', name: { kind: 'Name', value: 'token' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'token' } } }],
                },
              },
            ],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'status' } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const CreatePasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'forgotPasswordToken' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'forgotPasswordToken' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'forgotPasswordToken' } },
                    },
                    { kind: 'ObjectField', name: { kind: 'Name', value: 'password' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } } },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const ForgotPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'forgotPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'forgotPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [{ kind: 'ObjectField', name: { kind: 'Name', value: 'email' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } } }],
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const GetProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'getProfile' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProfile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const LoginUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'loginUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    { kind: 'ObjectField', name: { kind: 'Name', value: 'email' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } } },
                    { kind: 'ObjectField', name: { kind: 'Name', value: 'password' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } } },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'logout' },
      selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'logout' } }] },
    },
  ],
} as unknown as DocumentNode
export const RegenerateTokensDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'regenerateTokens' },
      selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'regenerateTokens' } }] },
    },
  ],
} as unknown as DocumentNode
export const RegisterUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'registerUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    { kind: 'ObjectField', name: { kind: 'Name', value: 'email' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } } },
                    { kind: 'ObjectField', name: { kind: 'Name', value: 'password' }, value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } } },
                  ],
                },
              },
            ],
            selectionSet: { kind: 'SelectionSet', selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }] },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode

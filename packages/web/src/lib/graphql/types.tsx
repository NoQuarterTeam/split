import gql from "graphql-tag"
import * as ApolloReactCommon from "@apollo/react-common"
import * as ApolloReactHooks from "@apollo/react-hooks"
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface AllCostsResponse {
  __typename?: "AllCostsResponse"
  costs: Cost[]
  count: Scalars["Float"]
}

export interface BaseEntity {
  __typename?: "BaseEntity"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
}

export interface Cost {
  __typename?: "Cost"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  name: Scalars["String"]
  recurring: Scalars["String"]
  equalSplit: Scalars["Boolean"]
  category: Scalars["String"]
  amount: Scalars["Float"]
  date: Scalars["String"]
  groupId: Scalars["String"]
  payerId: Scalars["String"]
  creatorId: Scalars["String"]
  group: Group
  payer: User
  creator: User
  shares: Share[]
}

export interface CostInput {
  name: Scalars["String"]
  amount: Scalars["Float"]
  recurring: Scalars["String"]
  equalSplit: Scalars["Boolean"]
  category: Scalars["String"]
  date: Scalars["String"]
  groupId: Scalars["String"]
  payerId: Scalars["String"]
  costShares: ShareInput[]
}

export interface Group {
  __typename?: "Group"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  name: Scalars["String"]
  currency?: Maybe<Scalars["String"]>
  users: User[]
  costs: Cost[]
  invites: Invite[]
}

export interface GroupInput {
  name: Scalars["String"]
  currency: Scalars["String"]
}

export interface Invite {
  __typename?: "Invite"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  email: Scalars["String"]
  groupId: Scalars["String"]
}

export interface InviteInput {
  groupId: Scalars["String"]
  email: Scalars["String"]
}

export interface LoginInput {
  email: Scalars["String"]
  password: Scalars["String"]
}

export interface Mutation {
  __typename?: "Mutation"
  createCost?: Maybe<Cost>
  destroyCost?: Maybe<Scalars["Boolean"]>
  editCost?: Maybe<Cost>
  createGroup?: Maybe<Group>
  editGroup?: Maybe<Group>
  createInvite?: Maybe<Invite>
  destroyInvite?: Maybe<Scalars["Boolean"]>
  getSignedS3Url?: Maybe<S3SignedUrlResponse>
  register: User
  login: User
  updateUser?: Maybe<User>
  logout: Scalars["Boolean"]
  forgotPassword: Scalars["Boolean"]
  resetPassword: Scalars["Boolean"]
}

export interface MutationCreateCostArgs {
  data: CostInput
}

export interface MutationDestroyCostArgs {
  costId: Scalars["String"]
}

export interface MutationEditCostArgs {
  data: CostInput
  costId: Scalars["String"]
}

export interface MutationCreateGroupArgs {
  data: GroupInput
}

export interface MutationEditGroupArgs {
  data: GroupInput
  groupId: Scalars["String"]
}

export interface MutationCreateInviteArgs {
  data: InviteInput
}

export interface MutationDestroyInviteArgs {
  inviteId: Scalars["String"]
}

export interface MutationGetSignedS3UrlArgs {
  data: S3SignedUrlInput
}

export interface MutationRegisterArgs {
  data: RegisterInput
}

export interface MutationLoginArgs {
  data: LoginInput
}

export interface MutationUpdateUserArgs {
  data: UpdateInput
}

export interface MutationForgotPasswordArgs {
  email: Scalars["String"]
}

export interface MutationResetPasswordArgs {
  data: ResetPasswordInput
}

export interface Query {
  __typename?: "Query"
  allCosts?: Maybe<AllCostsResponse>
  getCost?: Maybe<Cost>
  group?: Maybe<Group>
  checkInvite?: Maybe<Group>
  me?: Maybe<User>
}

export interface QueryAllCostsArgs {
  skip?: Maybe<Scalars["Int"]>
  groupId: Scalars["String"]
  search?: Maybe<Scalars["String"]>
}

export interface QueryGetCostArgs {
  costId: Scalars["String"]
}

export interface QueryCheckInviteArgs {
  inviteId?: Maybe<Scalars["String"]>
}

export interface RegisterInput {
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  email: Scalars["String"]
  password: Scalars["String"]
  inviteId?: Maybe<Scalars["String"]>
}

export interface ResetPasswordInput {
  password: Scalars["String"]
  token: Scalars["String"]
}

export interface S3SignedUrlInput {
  filename: Scalars["String"]
  filetype: Scalars["String"]
}

export interface S3SignedUrlResponse {
  __typename?: "S3SignedUrlResponse"
  url: Scalars["String"]
  signedRequest: Scalars["String"]
}

export interface Share {
  __typename?: "Share"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  amount: Scalars["Float"]
  user: User
  cost: Cost
}

export interface ShareInput {
  userId: Scalars["String"]
  amount: Scalars["Float"]
}

export interface UpdateInput {
  firstName?: Maybe<Scalars["String"]>
  lastName?: Maybe<Scalars["String"]>
  email?: Maybe<Scalars["String"]>
  password?: Maybe<Scalars["String"]>
  avatar?: Maybe<Scalars["String"]>
  groupId?: Maybe<Scalars["String"]>
}

export interface User {
  __typename?: "User"
  id: Scalars["ID"]
  createdAt: Scalars["String"]
  updatedAt: Scalars["String"]
  email: Scalars["String"]
  firstName: Scalars["String"]
  lastName: Scalars["String"]
  avatar?: Maybe<Scalars["String"]>
  balance: Scalars["Float"]
  groupId?: Maybe<Scalars["String"]>
  group?: Maybe<Group>
  shares: Share[]
  costsCreated: Cost[]
  costsPaid: Cost[]
}
export type CostFragment = { __typename?: "Cost" } & Pick<
  Cost,
  | "id"
  | "name"
  | "amount"
  | "date"
  | "recurring"
  | "equalSplit"
  | "category"
  | "createdAt"
  | "groupId"
  | "payerId"
>

export type SharesFragment = { __typename?: "Cost" } & {
  shares: ({ __typename?: "Share" } & Pick<Share, "amount"> & {
        user: { __typename?: "User" } & Pick<User, "id">
      })[]
}

export type PayerFragment = { __typename?: "Cost" } & {
  payer: { __typename?: "User" } & Pick<
    User,
    "id" | "firstName" | "lastName" | "avatar"
  >
}

export interface AllCostsQueryVariables {
  groupId: Scalars["String"]
  search?: Maybe<Scalars["String"]>
  skip?: Maybe<Scalars["Int"]>
}

export type AllCostsQuery = { __typename?: "Query" } & {
  allCosts: Maybe<
    { __typename?: "AllCostsResponse" } & Pick<AllCostsResponse, "count"> & {
        costs: ({ __typename?: "Cost" } & CostFragment & PayerFragment)[]
      }
  >
}

export interface GetCostQueryVariables {
  costId: Scalars["String"]
}

export type GetCostQuery = { __typename?: "Query" } & {
  getCost: Maybe<{ __typename?: "Cost" } & CostFragment & SharesFragment>
}

export interface CreateCostMutationVariables {
  data: CostInput
}

export type CreateCostMutation = { __typename?: "Mutation" } & {
  createCost: Maybe<{ __typename?: "Cost" } & CostFragment & PayerFragment>
}

export interface EditCostMutationVariables {
  costId: Scalars["String"]
  data: CostInput
}

export type EditCostMutation = { __typename?: "Mutation" } & {
  editCost: Maybe<{ __typename?: "Cost" } & CostFragment & SharesFragment>
}

export interface DestroyCostMutationVariables {
  costId: Scalars["String"]
}

export type DestroyCostMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyCost"
>

export type GroupFragment = { __typename?: "Group" } & Pick<
  Group,
  "id" | "name" | "currency"
>

export interface GetGroupQueryVariables {}

export type GetGroupQuery = { __typename?: "Query" } & {
  group: Maybe<
    ({ __typename?: "Group" } & {
      users: ({ __typename?: "User" } & UserFragment)[]
      invites: ({ __typename?: "Invite" } & InviteFragment)[]
    }) &
      GroupFragment
  >
}

export interface CreateGroupMutationVariables {
  data: GroupInput
}

export type CreateGroupMutation = { __typename?: "Mutation" } & {
  createGroup: Maybe<
    ({ __typename?: "Group" } & {
      users: ({ __typename?: "User" } & UserFragment)[]
      invites: ({ __typename?: "Invite" } & InviteFragment)[]
    }) &
      GroupFragment
  >
}

export interface EditGroupMutationVariables {
  groupId: Scalars["String"]
  data: GroupInput
}

export type EditGroupMutation = { __typename?: "Mutation" } & {
  editGroup: Maybe<{ __typename?: "Group" } & GroupFragment>
}

export type InviteFragment = { __typename?: "Invite" } & Pick<
  Invite,
  "id" | "email"
>

export interface CreateInviteMutationVariables {
  data: InviteInput
}

export type CreateInviteMutation = { __typename?: "Mutation" } & {
  createInvite: Maybe<{ __typename?: "Invite" } & InviteFragment>
}

export interface DestroyInviteMutationVariables {
  inviteId: Scalars["String"]
}

export type DestroyInviteMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "destroyInvite"
>

export interface CheckInviteQueryVariables {
  inviteId?: Maybe<Scalars["String"]>
}

export type CheckInviteQuery = { __typename?: "Query" } & {
  checkInvite: Maybe<{ __typename?: "Group" } & GroupFragment>
}

export interface GetSignedS3UrlMutationVariables {
  data: S3SignedUrlInput
}

export type GetSignedS3UrlMutation = { __typename?: "Mutation" } & {
  getSignedS3Url: Maybe<
    { __typename?: "S3SignedUrlResponse" } & Pick<
      S3SignedUrlResponse,
      "url" | "signedRequest"
    >
  >
}

export type UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "firstName" | "lastName" | "groupId" | "email" | "balance" | "avatar"
>

export interface MeQueryVariables {}

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserFragment>
}

export interface LoginMutationVariables {
  data: LoginInput
}

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "User" } & UserFragment
}

export interface RegisterMutationVariables {
  data: RegisterInput
}

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & UserFragment
}

export interface UpdateUserMutationVariables {
  data: UpdateInput
}

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: Maybe<{ __typename?: "User" } & UserFragment>
}

export interface LogoutMutationVariables {}

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>

export interface ForgotPasswordMutationVariables {
  email: Scalars["String"]
}

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>

export interface ResetPasswordMutationVariables {
  data: ResetPasswordInput
}

export type ResetPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resetPassword"
>
export const CostFragmentDoc = gql`
  fragment Cost on Cost {
    id
    name
    amount
    date
    recurring
    equalSplit
    category
    createdAt
    groupId
    payerId
  }
`
export const SharesFragmentDoc = gql`
  fragment Shares on Cost {
    shares {
      user {
        id
      }
      amount
    }
  }
`
export const PayerFragmentDoc = gql`
  fragment Payer on Cost {
    payer {
      id
      firstName
      lastName
      avatar
    }
  }
`
export const GroupFragmentDoc = gql`
  fragment Group on Group {
    id
    name
    currency
  }
`
export const InviteFragmentDoc = gql`
  fragment Invite on Invite {
    id
    email
  }
`
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    firstName
    lastName
    groupId
    email
    balance
    avatar
  }
`
export const AllCostsDocument = gql`
  query AllCosts($groupId: String!, $search: String, $skip: Int) {
    allCosts(groupId: $groupId, search: $search, skip: $skip) {
      costs {
        ...Cost
        ...Payer
      }
      count
    }
  }
  ${CostFragmentDoc}
  ${PayerFragmentDoc}
`

export function useAllCostsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AllCostsQuery,
    AllCostsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<AllCostsQuery, AllCostsQueryVariables>(
    AllCostsDocument,
    baseOptions,
  )
}
export function useAllCostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AllCostsQuery,
    AllCostsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<AllCostsQuery, AllCostsQueryVariables>(
    AllCostsDocument,
    baseOptions,
  )
}

export type AllCostsQueryHookResult = ReturnType<typeof useAllCostsQuery>
export type AllCostsQueryResult = ApolloReactCommon.QueryResult<
  AllCostsQuery,
  AllCostsQueryVariables
>
export const GetCostDocument = gql`
  query GetCost($costId: String!) {
    getCost(costId: $costId) {
      ...Cost
      ...Shares
    }
  }
  ${CostFragmentDoc}
  ${SharesFragmentDoc}
`

export function useGetCostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCostQuery,
    GetCostQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetCostQuery, GetCostQueryVariables>(
    GetCostDocument,
    baseOptions,
  )
}
export function useGetCostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCostQuery,
    GetCostQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetCostQuery, GetCostQueryVariables>(
    GetCostDocument,
    baseOptions,
  )
}

export type GetCostQueryHookResult = ReturnType<typeof useGetCostQuery>
export type GetCostQueryResult = ApolloReactCommon.QueryResult<
  GetCostQuery,
  GetCostQueryVariables
>
export const CreateCostDocument = gql`
  mutation CreateCost($data: CostInput!) {
    createCost(data: $data) {
      ...Cost
      ...Payer
    }
  }
  ${CostFragmentDoc}
  ${PayerFragmentDoc}
`

export function useCreateCostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCostMutation,
    CreateCostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateCostMutation,
    CreateCostMutationVariables
  >(CreateCostDocument, baseOptions)
}
export type CreateCostMutationHookResult = ReturnType<
  typeof useCreateCostMutation
>
export type CreateCostMutationResult = ApolloReactCommon.MutationResult<
  CreateCostMutation
>
export type CreateCostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCostMutation,
  CreateCostMutationVariables
>
export const EditCostDocument = gql`
  mutation EditCost($costId: String!, $data: CostInput!) {
    editCost(costId: $costId, data: $data) {
      ...Cost
      ...Shares
    }
  }
  ${CostFragmentDoc}
  ${SharesFragmentDoc}
`

export function useEditCostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditCostMutation,
    EditCostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EditCostMutation,
    EditCostMutationVariables
  >(EditCostDocument, baseOptions)
}
export type EditCostMutationHookResult = ReturnType<typeof useEditCostMutation>
export type EditCostMutationResult = ApolloReactCommon.MutationResult<
  EditCostMutation
>
export type EditCostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditCostMutation,
  EditCostMutationVariables
>
export const DestroyCostDocument = gql`
  mutation DestroyCost($costId: String!) {
    destroyCost(costId: $costId)
  }
`

export function useDestroyCostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyCostMutation,
    DestroyCostMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyCostMutation,
    DestroyCostMutationVariables
  >(DestroyCostDocument, baseOptions)
}
export type DestroyCostMutationHookResult = ReturnType<
  typeof useDestroyCostMutation
>
export type DestroyCostMutationResult = ApolloReactCommon.MutationResult<
  DestroyCostMutation
>
export type DestroyCostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyCostMutation,
  DestroyCostMutationVariables
>
export const GetGroupDocument = gql`
  query GetGroup {
    group {
      ...Group
      users {
        ...User
      }
      invites {
        ...Invite
      }
    }
  }
  ${GroupFragmentDoc}
  ${UserFragmentDoc}
  ${InviteFragmentDoc}
`

export function useGetGroupQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetGroupQuery,
    GetGroupQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetGroupQuery, GetGroupQueryVariables>(
    GetGroupDocument,
    baseOptions,
  )
}
export function useGetGroupLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetGroupQuery,
    GetGroupQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetGroupQuery, GetGroupQueryVariables>(
    GetGroupDocument,
    baseOptions,
  )
}

export type GetGroupQueryHookResult = ReturnType<typeof useGetGroupQuery>
export type GetGroupQueryResult = ApolloReactCommon.QueryResult<
  GetGroupQuery,
  GetGroupQueryVariables
>
export const CreateGroupDocument = gql`
  mutation CreateGroup($data: GroupInput!) {
    createGroup(data: $data) {
      ...Group
      users {
        ...User
      }
      invites {
        ...Invite
      }
    }
  }
  ${GroupFragmentDoc}
  ${UserFragmentDoc}
  ${InviteFragmentDoc}
`

export function useCreateGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateGroupMutation,
    CreateGroupMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateGroupMutation,
    CreateGroupMutationVariables
  >(CreateGroupDocument, baseOptions)
}
export type CreateGroupMutationHookResult = ReturnType<
  typeof useCreateGroupMutation
>
export type CreateGroupMutationResult = ApolloReactCommon.MutationResult<
  CreateGroupMutation
>
export type CreateGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateGroupMutation,
  CreateGroupMutationVariables
>
export const EditGroupDocument = gql`
  mutation EditGroup($groupId: String!, $data: GroupInput!) {
    editGroup(groupId: $groupId, data: $data) {
      ...Group
    }
  }
  ${GroupFragmentDoc}
`

export function useEditGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditGroupMutation,
    EditGroupMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EditGroupMutation,
    EditGroupMutationVariables
  >(EditGroupDocument, baseOptions)
}
export type EditGroupMutationHookResult = ReturnType<
  typeof useEditGroupMutation
>
export type EditGroupMutationResult = ApolloReactCommon.MutationResult<
  EditGroupMutation
>
export type EditGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditGroupMutation,
  EditGroupMutationVariables
>
export const CreateInviteDocument = gql`
  mutation CreateInvite($data: InviteInput!) {
    createInvite(data: $data) {
      ...Invite
    }
  }
  ${InviteFragmentDoc}
`

export function useCreateInviteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateInviteMutation,
    CreateInviteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateInviteMutation,
    CreateInviteMutationVariables
  >(CreateInviteDocument, baseOptions)
}
export type CreateInviteMutationHookResult = ReturnType<
  typeof useCreateInviteMutation
>
export type CreateInviteMutationResult = ApolloReactCommon.MutationResult<
  CreateInviteMutation
>
export type CreateInviteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateInviteMutation,
  CreateInviteMutationVariables
>
export const DestroyInviteDocument = gql`
  mutation DestroyInvite($inviteId: String!) {
    destroyInvite(inviteId: $inviteId)
  }
`

export function useDestroyInviteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DestroyInviteMutation,
    DestroyInviteMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DestroyInviteMutation,
    DestroyInviteMutationVariables
  >(DestroyInviteDocument, baseOptions)
}
export type DestroyInviteMutationHookResult = ReturnType<
  typeof useDestroyInviteMutation
>
export type DestroyInviteMutationResult = ApolloReactCommon.MutationResult<
  DestroyInviteMutation
>
export type DestroyInviteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DestroyInviteMutation,
  DestroyInviteMutationVariables
>
export const CheckInviteDocument = gql`
  query CheckInvite($inviteId: String) {
    checkInvite(inviteId: $inviteId) {
      ...Group
    }
  }
  ${GroupFragmentDoc}
`

export function useCheckInviteQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CheckInviteQuery,
    CheckInviteQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<CheckInviteQuery, CheckInviteQueryVariables>(
    CheckInviteDocument,
    baseOptions,
  )
}
export function useCheckInviteLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CheckInviteQuery,
    CheckInviteQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    CheckInviteQuery,
    CheckInviteQueryVariables
  >(CheckInviteDocument, baseOptions)
}

export type CheckInviteQueryHookResult = ReturnType<typeof useCheckInviteQuery>
export type CheckInviteQueryResult = ApolloReactCommon.QueryResult<
  CheckInviteQuery,
  CheckInviteQueryVariables
>
export const GetSignedS3UrlDocument = gql`
  mutation GetSignedS3Url($data: S3SignedUrlInput!) {
    getSignedS3Url(data: $data) {
      url
      signedRequest
    }
  }
`

export function useGetSignedS3UrlMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GetSignedS3UrlMutation,
    GetSignedS3UrlMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    GetSignedS3UrlMutation,
    GetSignedS3UrlMutationVariables
  >(GetSignedS3UrlDocument, baseOptions)
}
export type GetSignedS3UrlMutationHookResult = ReturnType<
  typeof useGetSignedS3UrlMutation
>
export type GetSignedS3UrlMutationResult = ApolloReactCommon.MutationResult<
  GetSignedS3UrlMutation
>
export type GetSignedS3UrlMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GetSignedS3UrlMutation,
  GetSignedS3UrlMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeQuery,
    MeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions,
  )
}

export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const UpdateUserDocument = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`

export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions)
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<
  UpdateUserMutation
>
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`

export function useForgotPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions)
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<
  ForgotPasswordMutation
>
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`

export function useResetPasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, baseOptions)
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<
  ResetPasswordMutation
>
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>

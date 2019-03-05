export type Maybe<T> = T | null

export interface CostInput {
  name: string

  amount: number

  recurring: string

  equalSplit: boolean

  category: string

  date: string

  houseId: string

  payerId: string

  costShares: ShareInput[]
}

export interface ShareInput {
  userId: string

  amount: number
}

export interface HouseInput {
  name: string
}

export interface S3SignedUrlInput {
  filename: string

  filetype: string
}

export interface RegisterInput {
  firstName: string

  lastName: string

  email: string

  password: string

  inviteHouseId?: Maybe<string>
}

export interface LoginInput {
  email: string

  password: string
}

export interface UpdateInput {
  firstName?: Maybe<string>

  lastName?: Maybe<string>

  email?: Maybe<string>

  password?: Maybe<string>

  avatar?: Maybe<string>

  houseId?: Maybe<string>
}

export interface InviteUserInput {
  email: string

  houseId: string
}

export interface ResetPasswordInput {
  password: string

  token: string
}

// ====================================================
// Documents
// ====================================================

export type AllCostsVariables = {
  houseId: string
  search?: Maybe<string>
  skip?: Maybe<number>
}

export type AllCostsQuery = {
  __typename?: "Query"

  allCosts: Maybe<AllCostsAllCosts>
}

export type AllCostsAllCosts = {
  __typename?: "AllCostsResponse"

  costs: AllCostsCosts[]

  count: number
}

export type AllCostsCosts = CostFragment & PayerFragment

export type GetCostVariables = {
  costId: string
}

export type GetCostQuery = {
  __typename?: "Query"

  getCost: Maybe<GetCostGetCost>
}

export type GetCostGetCost = CostFragment & SharesFragment

export type CreateCostVariables = {
  data: CostInput
}

export type CreateCostMutation = {
  __typename?: "Mutation"

  createCost: Maybe<CreateCostCreateCost>
}

export type CreateCostCreateCost = CostFragment & PayerFragment

export type EditCostVariables = {
  costId: string
  data: CostInput
}

export type EditCostMutation = {
  __typename?: "Mutation"

  editCost: Maybe<EditCostEditCost>
}

export type EditCostEditCost = CostFragment & SharesFragment

export type DestroyCostVariables = {
  costId: string
}

export type DestroyCostMutation = {
  __typename?: "Mutation"

  destroyCost: Maybe<boolean>
}

export type CheckHouseVariables = {
  houseId?: Maybe<string>
}

export type CheckHouseQuery = {
  __typename?: "Query"

  checkHouse: Maybe<CheckHouseCheckHouse>
}

export type CheckHouseCheckHouse = HouseFragment

export type GetHouseVariables = {}

export type GetHouseQuery = {
  __typename?: "Query"

  house: Maybe<GetHouseHouse>
}

export type GetHouseHouse = {
  __typename?: "House"

  users: GetHouseUsers[]
} & HouseFragment

export type GetHouseUsers = UserFragment

export type CreateHouseVariables = {
  data: HouseInput
}

export type CreateHouseMutation = {
  __typename?: "Mutation"

  createHouse: Maybe<CreateHouseCreateHouse>
}

export type CreateHouseCreateHouse = {
  __typename?: "House"

  users: CreateHouseUsers[]
} & HouseFragment

export type CreateHouseUsers = UserFragment

export type EditHouseVariables = {
  houseId: string
  data: HouseInput
}

export type EditHouseMutation = {
  __typename?: "Mutation"

  editHouse: Maybe<EditHouseEditHouse>
}

export type EditHouseEditHouse = {
  __typename?: "House"

  users: EditHouseUsers[]
} & HouseFragment

export type EditHouseUsers = UserFragment

export type GetSignedS3UrlVariables = {
  data: S3SignedUrlInput
}

export type GetSignedS3UrlMutation = {
  __typename?: "Mutation"

  getSignedS3Url: Maybe<GetSignedS3UrlGetSignedS3Url>
}

export type GetSignedS3UrlGetSignedS3Url = {
  __typename?: "S3SignedUrlResponse"

  url: string

  signedRequest: string
}

export type MeVariables = {}

export type MeQuery = {
  __typename?: "Query"

  me: Maybe<MeMe>
}

export type MeMe = {
  __typename?: "User"

  houseId: Maybe<string>
} & UserFragment

export type LoginVariables = {
  data: LoginInput
}

export type LoginMutation = {
  __typename?: "Mutation"

  login: LoginLogin
}

export type LoginLogin = {
  __typename?: "UserAuthResponse"

  user: LoginUser

  token: string
}

export type LoginUser = {
  __typename?: "User"

  houseId: Maybe<string>
} & UserFragment

export type RegisterVariables = {
  data: RegisterInput
}

export type RegisterMutation = {
  __typename?: "Mutation"

  register: RegisterRegister
}

export type RegisterRegister = {
  __typename?: "UserAuthResponse"

  user: RegisterUser

  token: string
}

export type RegisterUser = {
  __typename?: "User"

  houseId: Maybe<string>
} & UserFragment

export type UpdateUserVariables = {
  data: UpdateInput
}

export type UpdateUserMutation = {
  __typename?: "Mutation"

  updateUser: Maybe<UpdateUserUpdateUser>
}

export type UpdateUserUpdateUser = {
  __typename?: "User"

  houseId: Maybe<string>
} & UserFragment

export type LogoutVariables = {}

export type LogoutMutation = {
  __typename?: "Mutation"

  logout: boolean
}

export type InviteUserVariables = {
  data: InviteUserInput
}

export type InviteUserMutation = {
  __typename?: "Mutation"

  inviteUser: Maybe<boolean>
}

export type ForgotPasswordVariables = {
  email: string
}

export type ForgotPasswordMutation = {
  __typename?: "Mutation"

  forgotPassword: boolean
}

export type ResetPasswordVariables = {
  data: ResetPasswordInput
}

export type ResetPasswordMutation = {
  __typename?: "Mutation"

  resetPassword: boolean
}

export type CostFragment = {
  __typename?: "Cost"

  id: string

  name: string

  amount: number

  date: string

  recurring: string

  equalSplit: boolean

  category: string

  createdAt: string

  houseId: string

  payerId: string
}

export type SharesFragment = {
  __typename?: "Cost"

  shares: SharesShares[]
}

export type SharesShares = {
  __typename?: "Share"

  user: SharesUser

  amount: number
}

export type SharesUser = {
  __typename?: "User"

  id: string
}

export type PayerFragment = {
  __typename?: "Cost"

  payer: PayerPayer
}

export type PayerPayer = {
  __typename?: "User"

  id: string

  firstName: string

  lastName: string

  avatar: Maybe<string>
}

export type HouseFragment = {
  __typename?: "House"

  id: string

  name: string
}

export type UserFragment = {
  __typename?: "User"

  id: string

  firstName: string

  lastName: string

  email: string

  balance: number

  avatar: Maybe<string>
}

import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"

// ====================================================
// Fragments
// ====================================================

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
    houseId
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

export const HouseFragmentDoc = gql`
  fragment House on House {
    id
    name
  }
`

export const UserFragmentDoc = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
    balance
    avatar
  }
`

// ====================================================
// Components
// ====================================================

export const AllCostsDocument = gql`
  query AllCosts($houseId: String!, $search: String, $skip: Int) {
    allCosts(houseId: $houseId, search: $search, skip: $skip) {
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
export function useAllCosts(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AllCostsVariables>,
) {
  return ReactApolloHooks.useQuery<AllCostsQuery, AllCostsVariables>(
    AllCostsDocument,
    baseOptions,
  )
}
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
export function useGetCost(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetCostVariables>,
) {
  return ReactApolloHooks.useQuery<GetCostQuery, GetCostVariables>(
    GetCostDocument,
    baseOptions,
  )
}
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
export function useCreateCost(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateCostMutation,
    CreateCostVariables
  >,
) {
  return ReactApolloHooks.useMutation<CreateCostMutation, CreateCostVariables>(
    CreateCostDocument,
    baseOptions,
  )
}
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
export function useEditCost(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    EditCostMutation,
    EditCostVariables
  >,
) {
  return ReactApolloHooks.useMutation<EditCostMutation, EditCostVariables>(
    EditCostDocument,
    baseOptions,
  )
}
export const DestroyCostDocument = gql`
  mutation DestroyCost($costId: String!) {
    destroyCost(costId: $costId)
  }
`
export function useDestroyCost(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DestroyCostMutation,
    DestroyCostVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    DestroyCostMutation,
    DestroyCostVariables
  >(DestroyCostDocument, baseOptions)
}
export const CheckHouseDocument = gql`
  query CheckHouse($houseId: String) {
    checkHouse(houseId: $houseId) {
      ...House
    }
  }

  ${HouseFragmentDoc}
`
export function useCheckHouse(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CheckHouseVariables>,
) {
  return ReactApolloHooks.useQuery<CheckHouseQuery, CheckHouseVariables>(
    CheckHouseDocument,
    baseOptions,
  )
}
export const GetHouseDocument = gql`
  query GetHouse {
    house {
      ...House
      users {
        ...User
      }
    }
  }

  ${HouseFragmentDoc}
  ${UserFragmentDoc}
`
export function useGetHouse(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetHouseVariables>,
) {
  return ReactApolloHooks.useQuery<GetHouseQuery, GetHouseVariables>(
    GetHouseDocument,
    baseOptions,
  )
}
export const CreateHouseDocument = gql`
  mutation CreateHouse($data: HouseInput!) {
    createHouse(data: $data) {
      ...House
      users {
        ...User
      }
    }
  }

  ${HouseFragmentDoc}
  ${UserFragmentDoc}
`
export function useCreateHouse(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateHouseMutation,
    CreateHouseVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    CreateHouseMutation,
    CreateHouseVariables
  >(CreateHouseDocument, baseOptions)
}
export const EditHouseDocument = gql`
  mutation EditHouse($houseId: String!, $data: HouseInput!) {
    editHouse(houseId: $houseId, data: $data) {
      ...House
      users {
        ...User
      }
    }
  }

  ${HouseFragmentDoc}
  ${UserFragmentDoc}
`
export function useEditHouse(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    EditHouseMutation,
    EditHouseVariables
  >,
) {
  return ReactApolloHooks.useMutation<EditHouseMutation, EditHouseVariables>(
    EditHouseDocument,
    baseOptions,
  )
}
export const GetSignedS3UrlDocument = gql`
  mutation GetSignedS3Url($data: S3SignedUrlInput!) {
    getSignedS3Url(data: $data) {
      url
      signedRequest
    }
  }
`
export function useGetSignedS3Url(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    GetSignedS3UrlMutation,
    GetSignedS3UrlVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    GetSignedS3UrlMutation,
    GetSignedS3UrlVariables
  >(GetSignedS3UrlDocument, baseOptions)
}
export const MeDocument = gql`
  query Me {
    me {
      ...User
      houseId
    }
  }

  ${UserFragmentDoc}
`
export function useMe(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeVariables>,
) {
  return ReactApolloHooks.useQuery<MeQuery, MeVariables>(
    MeDocument,
    baseOptions,
  )
}
export const LoginDocument = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      user {
        ...User
        houseId
      }
      token
    }
  }

  ${UserFragmentDoc}
`
export function useLogin(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginVariables
  >,
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginVariables>(
    LoginDocument,
    baseOptions,
  )
}
export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        ...User
        houseId
      }
      token
    }
  }

  ${UserFragmentDoc}
`
export function useRegister(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RegisterMutation,
    RegisterVariables
  >,
) {
  return ReactApolloHooks.useMutation<RegisterMutation, RegisterVariables>(
    RegisterDocument,
    baseOptions,
  )
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($data: UpdateInput!) {
    updateUser(data: $data) {
      ...User
      houseId
    }
  }

  ${UserFragmentDoc}
`
export function useUpdateUser(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserVariables
  >,
) {
  return ReactApolloHooks.useMutation<UpdateUserMutation, UpdateUserVariables>(
    UpdateUserDocument,
    baseOptions,
  )
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export function useLogout(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LogoutMutation,
    LogoutVariables
  >,
) {
  return ReactApolloHooks.useMutation<LogoutMutation, LogoutVariables>(
    LogoutDocument,
    baseOptions,
  )
}
export const InviteUserDocument = gql`
  mutation InviteUser($data: InviteUserInput!) {
    inviteUser(data: $data)
  }
`
export function useInviteUser(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    InviteUserMutation,
    InviteUserVariables
  >,
) {
  return ReactApolloHooks.useMutation<InviteUserMutation, InviteUserVariables>(
    InviteUserDocument,
    baseOptions,
  )
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`
export function useForgotPassword(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordVariables
  >(ForgotPasswordDocument, baseOptions)
}
export const ResetPasswordDocument = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data)
  }
`
export function useResetPassword(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordVariables
  >,
) {
  return ReactApolloHooks.useMutation<
    ResetPasswordMutation,
    ResetPasswordVariables
  >(ResetPasswordDocument, baseOptions)
}

// ====================================================
// Types
// ====================================================

export interface Query {
  allCosts?: Maybe<AllCostsResponse>

  getCost?: Maybe<Cost>

  checkHouse?: Maybe<House>

  house?: Maybe<House>

  me?: Maybe<User>
}

export interface AllCostsResponse {
  costs: Cost[]

  count: number
}

export interface Cost {
  id: string

  name: string

  recurring: string

  equalSplit: boolean

  category: string

  amount: number

  date: string

  houseId: string

  payerId: string

  creatorId: string

  house: House

  payer: User

  creator: User

  createdAt: string

  updatedAt: string

  shares: Share[]
}

export interface House {
  id: string

  name: string

  users: User[]

  costs: Cost[]
}

export interface User {
  id: string

  email: string

  firstName: string

  lastName: string

  avatar?: Maybe<string>

  balance: number

  houseId?: Maybe<string>

  house?: Maybe<House>

  shares: Share[]

  costsCreated: Cost[]

  costsPaid: Cost[]

  createdAt: string

  updatedAt: string
}

export interface Share {
  id: string

  amount: number

  user: User

  cost: Cost

  createdAt: string

  updatedAt: string
}

export interface Mutation {
  createCost?: Maybe<Cost>

  destroyCost?: Maybe<boolean>

  editCost?: Maybe<Cost>

  createHouse?: Maybe<House>

  editHouse?: Maybe<House>

  getSignedS3Url?: Maybe<S3SignedUrlResponse>

  register: UserAuthResponse

  login: UserAuthResponse

  updateUser?: Maybe<User>

  logout: boolean

  inviteUser?: Maybe<boolean>

  forgotPassword: boolean

  resetPassword: boolean
}

export interface S3SignedUrlResponse {
  url: string

  signedRequest: string
}

export interface UserAuthResponse {
  user: User

  token: string
}

// ====================================================
// Arguments
// ====================================================

export interface AllCostsQueryArgs {
  skip?: Maybe<number>

  houseId: string

  search?: Maybe<string>
}
export interface GetCostQueryArgs {
  costId: string
}
export interface CheckHouseQueryArgs {
  houseId?: Maybe<string>
}
export interface CreateCostMutationArgs {
  data: CostInput
}
export interface DestroyCostMutationArgs {
  costId: string
}
export interface EditCostMutationArgs {
  data: CostInput

  costId: string
}
export interface CreateHouseMutationArgs {
  data: HouseInput
}
export interface EditHouseMutationArgs {
  data: HouseInput

  houseId: string
}
export interface GetSignedS3UrlMutationArgs {
  data: S3SignedUrlInput
}
export interface RegisterMutationArgs {
  data: RegisterInput
}
export interface LoginMutationArgs {
  data: LoginInput
}
export interface UpdateUserMutationArgs {
  data: UpdateInput
}
export interface InviteUserMutationArgs {
  data: InviteUserInput
}
export interface ForgotPasswordMutationArgs {
  email: string
}
export interface ResetPasswordMutationArgs {
  data: ResetPasswordInput
}

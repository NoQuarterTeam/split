export type Maybe<T> = T | null

export interface CostInput {
  name: string

  amount: number

  recurring: string

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

export namespace AllCosts {
  export type Variables = {
    houseId: string
    skip?: Maybe<number>
  }

  export type Query = {
    __typename?: "Query"

    allCosts: AllCosts
  }

  export type AllCosts = {
    __typename?: "AllCostsResponse"

    costs: Costs[]

    count: number
  }

  export type Costs = Cost.Fragment & Payer.Fragment
}

export namespace GetCost {
  export type Variables = {
    costId: string
  }

  export type Query = {
    __typename?: "Query"

    getCost: GetCost
  }

  export type GetCost = Cost.Fragment & Shares.Fragment
}

export namespace CreateCost {
  export type Variables = {
    data: CostInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    createCost: CreateCost
  }

  export type CreateCost = Cost.Fragment & Payer.Fragment
}

export namespace EditCost {
  export type Variables = {
    costId: string
    data: CostInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    editCost: EditCost
  }

  export type EditCost = Cost.Fragment & Payer.Fragment
}

export namespace DestroyCost {
  export type Variables = {
    costId: string
  }

  export type Mutation = {
    __typename?: "Mutation"

    destroyCost: boolean
  }
}

export namespace CheckHouse {
  export type Variables = {
    houseId?: Maybe<string>
  }

  export type Query = {
    __typename?: "Query"

    checkHouse: Maybe<CheckHouse>
  }

  export type CheckHouse = House.Fragment
}

export namespace GetHouse {
  export type Variables = {}

  export type Query = {
    __typename?: "Query"

    house: House
  }

  export type House = {
    __typename?: "House"

    users: Users[]
  } & House.Fragment

  export type Users = User.Fragment
}

export namespace CreateHouse {
  export type Variables = {
    data: HouseInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    createHouse: CreateHouse
  }

  export type CreateHouse = {
    __typename?: "House"

    users: Users[]
  } & House.Fragment

  export type Users = User.Fragment
}

export namespace EditHouse {
  export type Variables = {
    houseId: string
    data: HouseInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    editHouse: EditHouse
  }

  export type EditHouse = {
    __typename?: "House"

    users: Users[]
  } & House.Fragment

  export type Users = User.Fragment
}

export namespace Me {
  export type Variables = {}

  export type Query = {
    __typename?: "Query"

    me: Me
  }

  export type Me = {
    __typename?: "User"

    houseId: Maybe<string>
  } & User.Fragment
}

export namespace Login {
  export type Variables = {
    data: LoginInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    login: Login
  }

  export type Login = {
    __typename?: "UserAuthResponse"

    user: User

    token: string
  }

  export type User = {
    __typename?: "User"

    houseId: Maybe<string>
  } & User.Fragment
}

export namespace Register {
  export type Variables = {
    data: RegisterInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    register: Register
  }

  export type Register = {
    __typename?: "UserAuthResponse"

    user: User

    token: string
  }

  export type User = {
    __typename?: "User"

    houseId: Maybe<string>
  } & User.Fragment
}

export namespace UpdateUser {
  export type Variables = {
    data: UpdateInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    updateUser: UpdateUser
  }

  export type UpdateUser = {
    __typename?: "User"

    houseId: Maybe<string>
  } & User.Fragment
}

export namespace Logout {
  export type Variables = {}

  export type Mutation = {
    __typename?: "Mutation"

    logout: boolean
  }
}

export namespace InviteUser {
  export type Variables = {
    data: InviteUserInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    inviteUser: boolean
  }
}

export namespace ForgotPassword {
  export type Variables = {
    email: string
  }

  export type Mutation = {
    __typename?: "Mutation"

    forgotPassword: boolean
  }
}

export namespace ResetPassword {
  export type Variables = {
    data: ResetPasswordInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    resetPassword: boolean
  }
}

export namespace Cost {
  export type Fragment = {
    __typename?: "Cost"

    id: string

    name: string

    amount: number

    date: string

    recurring: string

    category: string

    createdAt: string

    houseId: string

    payerId: string
  }
}

export namespace Shares {
  export type Fragment = {
    __typename?: "Cost"

    shares: Shares[]
  }

  export type Shares = {
    __typename?: "Share"

    user: User

    amount: number
  }

  export type User = {
    __typename?: "User"

    id: string
  }
}

export namespace Payer {
  export type Fragment = {
    __typename?: "Cost"

    payer: Payer
  }

  export type Payer = {
    __typename?: "User"

    id: string

    firstName: string

    lastName: string

    avatar: Maybe<string>
  }
}

export namespace House {
  export type Fragment = {
    __typename?: "House"

    id: string

    name: string
  }
}

export namespace User {
  export type Fragment = {
    __typename?: "User"

    id: string

    firstName: string

    lastName: string

    email: string

    balance: number

    avatar: Maybe<string>
  }
}

// ====================================================
// Types
// ====================================================

export interface Query {
  allCosts: AllCostsResponse

  getCost: Cost

  checkHouse?: Maybe<House>

  house: House

  me: User
}

export interface AllCostsResponse {
  costs: Cost[]

  count: number
}

export interface Cost {
  id: string

  name: string

  recurring: string

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
  createCost: Cost

  destroyCost: boolean

  editCost: Cost

  createHouse: House

  editHouse: House

  register: UserAuthResponse

  login: UserAuthResponse

  updateUser: User

  logout: boolean

  inviteUser: boolean

  forgotPassword: boolean

  resetPassword: boolean
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

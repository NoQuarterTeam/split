export type Maybe<T> = T | null

export interface CostInput {
  name: string

  amount: number

  recurring?: Maybe<string>

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

export interface EditCostInput {
  name?: Maybe<string>

  amount?: Maybe<number>

  recurring?: Maybe<string>

  category?: Maybe<string>

  date?: Maybe<string>

  payerId: string

  costShares: ShareInput[]
}

export interface HouseInput {
  name: string
}

export interface RegisterInput {
  firstName: string

  lastName: string

  email: string

  password: string
}

export interface LoginInput {
  email: string

  password: string
}

export interface UpdateInput {
  firstName: string

  lastName: string

  email: string

  password: string

  houseId: string
}

// ====================================================
// Documents
// ====================================================

export namespace CreateCost {
  export type Variables = {
    data: CostInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    createCost: CreateCost
  }

  export type CreateCost = Cost.Fragment
}

export namespace GetHouse {
  export type Variables = {}

  export type Query = {
    __typename?: "Query"

    house: House
  }

  export type House = {
    __typename?: "House"

    id: string

    name: string

    users: Users[]
  }

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

    name: string
  }
}

export namespace Me {
  export type Variables = {}

  export type Query = {
    __typename?: "Query"

    me: Maybe<Me>
  }

  export type Me = {
    __typename?: "User"

    house: Maybe<House>
  } & User.Fragment

  export type House = {
    __typename?: "House"

    id: string

    name: string
  }
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
    __typename?: "User"

    house: Maybe<House>
  } & User.Fragment

  export type House = {
    __typename?: "House"

    id: string

    name: string
  }
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
    __typename?: "User"

    house: Maybe<House>
  } & User.Fragment

  export type House = {
    __typename?: "House"

    id: string

    name: string
  }
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

    house: Maybe<House>
  } & User.Fragment

  export type House = {
    __typename?: "House"

    id: string

    name: string
  }
}

export namespace Logout {
  export type Variables = {}

  export type Mutation = {
    __typename?: "Mutation"

    logout: boolean
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

    payer: Payer
  }

  export type Payer = {
    __typename?: "User"

    id: string

    firstName: string
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
  }
}

// ====================================================
// Types
// ====================================================

export interface Query {
  cost: Cost

  house: House

  me?: Maybe<User>
}

export interface Cost {
  id: string

  name: string

  recurring: string

  category: string

  amount: number

  date: string

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

  balance: number

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

  register: User

  login: User

  updateUser: User

  logout: boolean
}

// ====================================================
// Arguments
// ====================================================

export interface CostQueryArgs {
  costId: string
}
export interface CreateCostMutationArgs {
  data: CostInput
}
export interface DestroyCostMutationArgs {
  costId: string
}
export interface EditCostMutationArgs {
  data: EditCostInput

  costId: string
}
export interface CreateHouseMutationArgs {
  data: HouseInput
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

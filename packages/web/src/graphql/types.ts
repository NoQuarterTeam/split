export type Maybe<T> = T | null

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
}

// ====================================================
// Documents
// ====================================================

export namespace Me {
  export type Variables = {}

  export type Query = {
    __typename?: "Query"

    me: Maybe<Me>
  }

  export type Me = UserInfo.Fragment
}

export namespace Login {
  export type Variables = {
    data: LoginInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    login: Login
  }

  export type Login = UserInfo.Fragment
}

export namespace Register {
  export type Variables = {
    data: RegisterInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    register: Register
  }

  export type Register = UserInfo.Fragment
}

export namespace UpdateUser {
  export type Variables = {
    data: UpdateInput
  }

  export type Mutation = {
    __typename?: "Mutation"

    updateUser: UpdateUser
  }

  export type UpdateUser = UserInfo.Fragment
}

export namespace Logout {
  export type Variables = {}

  export type Mutation = {
    __typename?: "Mutation"

    logout: boolean
  }
}

export namespace UserInfo {
  export type Fragment = {
    __typename?: "User"

    id: string

    firstName: string

    lastName: string

    email: string
  }
}

// ====================================================
// Types
// ====================================================

export interface Query {
  me?: Maybe<User>
}

export interface User {
  id: string

  email: string

  firstName: string

  lastName: string
}

export interface Mutation {
  register: User

  login: User

  updateUser: User

  logout: boolean
}

// ====================================================
// Arguments
// ====================================================

export interface RegisterMutationArgs {
  data: RegisterInput
}
export interface LoginMutationArgs {
  data: LoginInput
}
export interface UpdateUserMutationArgs {
  data: UpdateInput
}

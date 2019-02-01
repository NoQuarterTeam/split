import React, { memo } from "react"

import Page from "../../components/Page"

import LoginForm from "./LoginForm"

function Login() {
  return (
    <Page>
      <LoginForm />
    </Page>
  )
}

export default memo(Login)

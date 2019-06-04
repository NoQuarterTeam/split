import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
// import { styled } from "@noquarter/ui"

import useAppContext from "../lib/hooks/useAppContext"

import ProfileForm from "../components/ProfileForm"
import QuickPage from "../components/QuickPage"
// import ThemeSwitcher from "../components/ThemeSwitcher"

const Settings: FC<RouteComponentProps> = () => {
  const { user } = useAppContext()

  return (
    <QuickPage title="Settings">
      <ProfileForm user={user} />
      {/* <StyledThemeWrapper>
        <ThemeSwitcher />
      </StyledThemeWrapper> */}
    </QuickPage>
  )
}

export default Settings

// const StyledThemeWrapper = styled.div`
//   padding: ${p => p.theme.paddingL};
// `

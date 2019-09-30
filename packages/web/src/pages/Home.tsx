import React, { FC } from "react"
import { RouteComponentProps, navigate } from "@reach/router"
import { media } from "../application/theme"
import GooglePlay from "../assets/images/google-play-badge.png"
import AppStore from "../assets/images/app-store-badge.png"
import { TEST_HOUSE, TEST_COSTS } from "../lib/tests/data"

import GroupBalance from "../components/GroupBalance"
import CostItem from "../components/CostItem"
import Display from "../components/styled/Display"
import Center from "../components/styled/Center"
import Logo from "../components/Logo"
import { Button, styled } from "@noquarter/ui"

const Home: FC<RouteComponentProps> = () => {
  return (
    <StyledHome>
      <StyledTopbar>
        <Logo />
        <Center>
          <Button variant="text" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Display size="md">
            <Button onClick={() => navigate("/register")}>Sign up free</Button>
          </Display>
        </Center>
      </StyledTopbar>
      <StyledHero>
        <div>
          <StyledHeroTitle>Keep track of your costs</StyledHeroTitle>
          <StyledHeroSubTitle>We’ll handle the maths</StyledHeroSubTitle>
          <StyledLinks>
            <a
              href="https://apps.apple.com/us/app/split-cost-tracker/id1469049942?ls=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledBadge src={AppStore} />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=co.noquarter.splitapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledBadge src={GooglePlay} />
            </a>
          </StyledLinks>
        </div>
        <Display size="md" hide={true}>
          <StyledSignUp>
            <Button onClick={() => navigate("/register")}>Sign up free</Button>
          </StyledSignUp>
        </Display>
      </StyledHero>
      <StyledDemo>
        <StyledBalance>
          <GroupBalance users={TEST_HOUSE.users} />
        </StyledBalance>
        <StyledCosts>
          {TEST_COSTS.map(cost => (
            <CostItem key={cost.id} cost={cost} />
          ))}
        </StyledCosts>
      </StyledDemo>
    </StyledHome>
  )
}

export default Home

const StyledHome = styled.div`
  min-height: ${window.innerHeight}px;
  width: 100%;
  background-color: ${p => p.theme.colorBackground};
  padding: 0;

  ${p => media.greaterThan("md")`
    padding: 0 ${p.theme.paddingL};
  `}
`

const StyledTopbar = styled.div`
  padding: ${p => p.theme.paddingL};
  ${p => p.theme.flexBetween};
`

const StyledHero = styled.div`
  padding: ${p => p.theme.paddingL};
  color: ${p => p.theme.colorText};
`

const StyledHeroTitle = styled.h1`
  font-weight: ${p => p.theme.fontExtraBold};
  font-size: ${p => p.theme.textXL};
  margin: ${p => p.theme.paddingM} 0;
`

const StyledHeroSubTitle = styled.h3`
  font-weight: normal;
  font-size: ${p => p.theme.textL};
  margin: ${p => p.theme.paddingL} 0;
`

const StyledDemo = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  padding: ${p => p.theme.paddingM};
`

const StyledSignUp = styled.div`
  margin-top: ${p => p.theme.paddingL};
`

const StyledBalance = styled.div`
  width: 100%;

  ${media.greaterThan("md")`
    width: 40%;
  `}
`

const StyledCosts = styled.div`
  pointer-events: none;
  width: 100%;

  &:after {
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    content: "";
    background: linear-gradient(
      to top,
      ${p => p.theme.colorBackground} 4%,
      rgba(255, 255, 255, 0) 80%
    );
  }

  ${media.greaterThan("md")`
    width: 60%;
  `}
`

const StyledLinks = styled.div`
  display: flex;
`

const StyledBadge = styled.img`
  width: 130px;
  margin-right: ${p => p.theme.paddingL};
`

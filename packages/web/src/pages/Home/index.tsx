import React from "react"
import { RouteComponentProps } from "@reach/router"
import styled, { media } from "../../application/theme"

import { TEST_HOUSE, TEST_COSTS } from "../../lib/tests/data"

import Button from "../../components/Button"
import HouseBalance from "../../components/HouseBalance"
import CostItem from "../../components/CostItem"
import Display from "../../components/styled/Display"
import Center from "../../components/styled/Center"
import Logo from "../../components/Logo"

function Home(props: RouteComponentProps) {
  return (
    <StyledHome>
      <StyledTopbar>
        <Logo />
        <Center>
          <Button
            variant="tertiary"
            color="header"
            onClick={() => props.navigate!("/login")}
          >
            Login
          </Button>
          <Display size="md">
            <Button onClick={() => props.navigate!("/register")}>
              Sign up free
            </Button>
          </Display>
        </Center>
      </StyledTopbar>
      <StyledHero>
        <StyledHeroTitle>Keep track of your costs</StyledHeroTitle>
        <StyledHeroSubTitle>We’ll handle the maths</StyledHeroSubTitle>
        <Display size="md" hide={true}>
          <Button onClick={() => props.navigate!("/register")}>
            Sign up free
          </Button>
        </Display>
      </StyledHero>
      <StyledDemo>
        <StyledBalance>
          <HouseBalance users={TEST_HOUSE.users} />
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
    padding: ${p.theme.paddingL};
    padding-bottom: 0;
  `}
`

const StyledTopbar = styled.div`
  padding: ${p => p.theme.paddingL};
  ${p => p.theme.flexBetween};
`

const StyledHero = styled.div`
  padding: ${p => p.theme.paddingL};
`

const StyledHeroTitle = styled.h1`
  font-weight: ${p => p.theme.fontBlack};
  font-size: ${p => p.theme.textXL};
  margin: ${p => p.theme.paddingL} 0;
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

  ${p => media.greaterThan("md")`
    padding: ${p.theme.paddingL};
  `}
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

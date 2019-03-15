import React from "react"
import { RouteComponentProps } from "@reach/router"
import styled from "../../application/theme"

import IconLogo from "../../assets/images/icon-logo.svg"
import Button from "../../components/Button"
import HouseBalance from "../../components/HouseBalance"
import CostItem from "../../components/CostItem"
import { homeUsers, homeCosts } from "../../lib/copy/home"

function Home(props: RouteComponentProps) {
  return (
    <StyledHome>
      <StyledHeader>
        <div>
          <img src={IconLogo} width={30} alt="logo" />
          <span style={{ paddingRight: 30 }}>Split</span>
        </div>
        <div>
          <Button
            variant="tertiary"
            color="header"
            onClick={() => props.navigate!("/login")}
          >
            Login
          </Button>
          <Button onClick={() => props.navigate!("/register")}>
            Sign up free
          </Button>
        </div>
      </StyledHeader>
      <StyledHero>
        <StyledHeroTitle>Keep track of your costs</StyledHeroTitle>
        <StyledHeroSubTitle>We’ll handle the maths</StyledHeroSubTitle>
      </StyledHero>
      <StyledDemo>
        <StyledBalance>
          <HouseBalance users={homeUsers} />
        </StyledBalance>
        <StyledCosts>
          {homeCosts.map(cost => (
            <CostItem key={cost.id} cost={cost} />
          ))}
        </StyledCosts>
      </StyledDemo>
    </StyledHome>
  )
}

export default Home

const StyledHome = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${p => p.theme.colorBackground};
  padding: ${p => p.theme.paddingXL};
`

const StyledHeader = styled.h1`
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
  margin-bottom: 0;
`

const StyledDemo = styled.div`
  display: flex;
  overflow: hidden;
  padding: ${p => p.theme.paddingL};
`

const StyledBalance = styled.div`
  width: 40%;
`

const StyledCosts = styled.div`
  pointer-events: none;
  width: 60%;
  position: relative;

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
`

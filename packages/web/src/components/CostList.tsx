import React, { useRef } from "react"

import styled, { media } from "../application/theme"
import useEventListener from "../lib/hooks/useEventListener"
import { useDebouncedCallback } from "../lib/hooks/useDebounce"

import useAppContext from "../lib/hooks/useAppContext"
import { useAllCostsQuery } from "../lib/graphql/costs/hooks"

import CostItem from "../components/CostItem"
import Column from "./styled/Column"

function CostList() {
  const { house } = useAppContext()
  const { costs, costsCount, fetchMore, costsLoading } = useAllCostsQuery(
    house.id,
  )
  const costListRef = useRef<HTMLDivElement>(null)
  const costsRef = useRef({ costs, costsCount, costsLoading })
  costsRef.current = { costs, costsLoading, costsCount }

  const handleScroll = () => {
    if (!costListRef.current) return
    const bottom =
      costListRef.current.getBoundingClientRect().bottom - 300 <=
      window.innerHeight
    if (
      bottom &&
      !costsRef.current.costsLoading &&
      costsRef.current.costs.length < costsRef.current.costsCount
    ) {
      fetchMore(costsRef.current.costs.length)
    }
  }

  const debouncedScroll = useDebouncedCallback(handleScroll, 100, [
    costsRef.current.costs.length,
  ])

  useEventListener("scroll", debouncedScroll, true)

  return (
    <StyledList>
      <StyledTableHeader>
        <Column flex={10}>
          <StyledLabel>Name</StyledLabel>
        </Column>
        <Column flex={5}>
          <StyledLabel>Amount</StyledLabel>
        </Column>
        <Column flex={5}>
          <StyledLabel>Payer</StyledLabel>
        </Column>
        <Column flex={3}>
          <StyledLabel>Date</StyledLabel>
        </Column>
        <Column flex={1} />
      </StyledTableHeader>
      {costs && costs.map(cost => <CostItem key={cost.id} cost={cost} />)}
      <div ref={costListRef} />
    </StyledList>
  )
}

export default CostList

const StyledList = styled.div`
  width: 100%;
`

const StyledTableHeader = styled.div`
  width: 100%;
  margin-bottom: ${p => p.theme.paddingL};
  padding: ${p => p.theme.paddingM};
  padding-right: 0;
  ${p => p.theme.flexCenter};

  ${p => media.greaterThan("sm")`
    padding: ${`${p.theme.paddingM} ${p.theme.paddingL}`};
  `}
`

const StyledLabel = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textXS};
  font-weight: ${p => p.theme.fontBlack};
`

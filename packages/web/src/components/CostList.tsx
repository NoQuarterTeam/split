import React, { useRef, useState, useMemo } from "react"
import dayjs from "dayjs"

import styled, { media } from "../application/theme"
import useEventListener from "../lib/hooks/useEventListener"
import { useDebouncedCallback } from "../lib/hooks/useDebounce"
import useAppContext from "../lib/hooks/useAppContext"

import { useAllCosts } from "../lib/graphql/costs/hooks"

import CostItem from "../components/CostItem"
import Column from "./styled/Column"
import CostsSearch from "./CostsSearch"
import Divider from "./styled/Divider"

function CostList() {
  const { house } = useAppContext()
  const [search, setSearch] = useState<string>("")
  const { costs, costsCount, fetchMore, costsLoading } = useAllCosts(
    house.id,
    search,
  )
  const costListRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!costListRef.current) return
    const bottom =
      costListRef.current.getBoundingClientRect().bottom - 300 <=
      window.innerHeight
    if (bottom && !costsLoading && costs.length < costsCount) {
      fetchMore(costs.length, search)
    }
  }

  const debouncedScroll = useDebouncedCallback(handleScroll, 100, [
    costs.length,
    search,
  ])

  useEventListener("scroll", debouncedScroll, true, [costs.length, search])

  const handleSearchSubmit = (input: string) => setSearch(input)

  const futureCosts = useMemo(
    () => costs && costs.filter(c => dayjs(c.date).isAfter(dayjs())),
    [costs.length],
  )
  const pastCosts = useMemo(
    () => costs && costs.filter(c => dayjs(c.date).isBefore(dayjs())),
    [costs.length],
  )

  return (
    <StyledList>
      <CostsSearch onSubmit={handleSearchSubmit} />
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
        <Column flex={4}>
          <StyledLabel>Date</StyledLabel>
        </Column>
        <Column flex={1} />
      </StyledTableHeader>
      {futureCosts &&
        futureCosts.map(cost => <CostItem key={cost.id} cost={cost} />)}
      {futureCosts && futureCosts.length > 0 && <Divider />}
      {pastCosts &&
        pastCosts.map(cost => <CostItem key={cost.id} cost={cost} />)}
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
  margin: ${p => p.theme.paddingL} 0;
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

import React, { useRef } from "react"
import dayjs from "dayjs"

import styled from "../application/theme"
import useEventListener from "../lib/hooks/useEventListener"
import { useDebouncedCallback } from "../lib/hooks/useDebounce"

import { useAllCostsQuery } from "../lib/graphql/costs/hooks"

import CostItem from "../components/CostItem"

function CostList({ house }: { house: { id: string } }) {
  const { costs, costsCount, next, costsLoading } = useAllCostsQuery(house.id)
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
      next(costsRef.current.costs.length)
    }
  }

  const debouncedScroll = useDebouncedCallback(handleScroll, 100, [
    costsRef.current.costs.length,
  ])

  useEventListener("scroll", debouncedScroll, true)

  return (
    <StyledList>
      {costs &&
        costs
          .filter(c => dayjs(c.date).isAfter(dayjs()))
          .map(cost => {
            return <CostItem key={cost.id} cost={cost} />
          })}
      {costs &&
        costs.filter(c => dayjs(c.date).isAfter(dayjs())).length > 0 && (
          <StyledDivider />
        )}
      {costs &&
        costs
          .filter(c => dayjs(c.date).isBefore(dayjs()))
          .map(cost => <CostItem key={cost.id} cost={cost} />)}
      <div ref={costListRef} />
    </StyledList>
  )
}

export default CostList

const StyledList = styled.div`
  width: 100%;
`

const StyledDivider = styled.div`
  width: 100%;
  height: 2px;
  margin: ${p => p.theme.paddingM} 0;
  padding: 0 ${p => p.theme.paddingM};
  background-color: ${p => p.theme.colorLightGrey};
`

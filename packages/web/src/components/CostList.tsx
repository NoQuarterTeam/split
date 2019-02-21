import React, { useRef } from "react"

import useEventListener from "../lib/hooks/useEventListener"
import { useDebouncedCallback } from "../lib/hooks/useDebounce"

import { useAllCostsQuery } from "../lib/graphql/costs/hooks"

import CostItem from "../components/CostItem"
import styled from "../application/theme"

function CostList({ house }: { house: { id: string } }) {
  const { costs, next, costsLoading } = useAllCostsQuery(house.id)
  const costListRef = useRef<HTMLDivElement>(null)
  const costsRef = useRef(costs)
  const costsLoadingRef = useRef(costsLoading)
  costsRef.current = costs
  costsLoadingRef.current = costsLoading

  const handleScroll = () => {
    if (!costListRef.current) return
    const bottom =
      costListRef.current.getBoundingClientRect().bottom - 300 <=
      window.innerHeight
    if (
      bottom &&
      costsRef.current.length % 10 === 0 &&
      !costsLoadingRef.current
    ) {
      next(costsRef.current.length)
    }
  }

  const debouncedScroll = useDebouncedCallback(handleScroll, 100, [
    costsRef.current.length,
  ])

  useEventListener("scroll", debouncedScroll, true)

  return (
    <StyledList>
      {costs &&
        costs.map(cost => {
          return <CostItem key={cost.id} cost={cost} />
        })}
      <div ref={costListRef} />
    </StyledList>
  )
}

export default CostList

const StyledList = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

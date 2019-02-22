import React, { useRef } from "react"

import useEventListener from "../lib/hooks/useEventListener"
import { useDebouncedCallback } from "../lib/hooks/useDebounce"

import { useAllCostsQuery } from "../lib/graphql/costs/hooks"

import CostItem from "../components/CostItem"
import styled from "../application/theme"

function CostList({ house }: { house: { id: string } }) {
  const { costs, costsCount, next, costsLoading } = useAllCostsQuery(house.id)
  const costListRef = useRef<HTMLDivElement>(null)
  const costsRef = useRef(costs)
  const costsCountRef = useRef(costsCount)
  const costsLoadingRef = useRef(costsLoading)
  costsRef.current = costs
  costsLoadingRef.current = costsLoading
  costsCountRef.current = costsCount

  const handleScroll = () => {
    if (!costListRef.current) return
    const bottom =
      costListRef.current.getBoundingClientRect().bottom - 300 <=
      window.innerHeight
    if (
      bottom &&
      !costsLoadingRef.current &&
      costsRef.current.length < costsCountRef.current
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
`

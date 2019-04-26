import { useEffect, useRef } from "react"

function useEventListener(
  eventName: string,
  handler: any,
  options?: any,
  element?: any,
) {
  let el = element
  if (!element) el = window
  const savedHandler = useRef<any>()
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const eventListener = (event: any) => savedHandler.current(event)

    el.addEventListener(eventName, eventListener, options)

    return () => {
      el.removeEventListener(eventName, eventListener, options)
    }
  }, [eventName, el, options])
}

export default useEventListener

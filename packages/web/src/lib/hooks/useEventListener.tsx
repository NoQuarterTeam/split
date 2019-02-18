import { useEffect } from "react"

function useEventListener(key: string, cb: (e: any) => void) {
  useEffect(() => {
    window.addEventListener(key, cb)
    return () => window.removeEventListener(key, cb)
  }, [])
}

export default useEventListener

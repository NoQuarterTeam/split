import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-community/async-storage"

export function useAsyncStorage(key: string, initialValue?: any) {
  const [storedValue, setStoredValue] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        const item = await AsyncStorage.getItem(key)
        item ? setStoredValue(JSON.parse(item)) : setStoredValue(initialValue)
      } catch (error) {
        console.log(error)
        setStoredValue(initialValue)
      }
    })()
  }, [storedValue])

  const setValue = async (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

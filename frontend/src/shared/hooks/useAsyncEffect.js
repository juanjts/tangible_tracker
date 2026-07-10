import { useEffect } from 'react'

export function useAsyncEffect(fn, deps) {
  useEffect(() => {
    let cancelled = false
    const getCancelled = () => cancelled
    fn(getCancelled)
    return () => { cancelled = true }
  }, deps)
}

import { useState, useCallback, useEffect } from 'react'

export const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true)
    } else {
      setTargetReached(false)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${width}px)`)
    media.addEventListener('change', updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true)
    }

    return () => media.removeEventListener('change', updateTarget)
  }, [])

  return targetReached
}

export const useBreakPoint = () => {
  const isReady = useMediaQuery(1)
  const isTablet = useMediaQuery(767)
  const isBigTablet = useMediaQuery(1024)
  const isDesktop = useMediaQuery(1280)
  const isDesktop40 = useMediaQuery(1440)
  const isDesktop20 = useMediaQuery(1920)

  return {
    isTablet,
    isBigTablet,
    isDesktop,
    isDesktop40,
    isDesktop20,
    isReady
  }
}

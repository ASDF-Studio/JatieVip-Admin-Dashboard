import { useAuth } from 'Contexts/Auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const SecurePage = ({ children, className = '', disabled = false }) => {
  const { user, ready } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user && ready) {
      // const nextPage = router.pathname
      router.push(`/login`)
    }
  }, [ready, user])

  if (!ready) {
    return <div>Loading</div>
  }

  return <div className={className}>{children}</div>
}

export default SecurePage

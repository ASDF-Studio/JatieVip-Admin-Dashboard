import { useAuth } from 'Contexts/Auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const SecurePage = ({ children, className = '' }) => {
  const { user } = useAuth()
  const router = useRouter()

  // useEffect(() => {
  //   if (!user) return
  //   if (user?.first_name === 'test') {
  //     router.push('/signup')
  //   }
  //   if (user?.last_name === 'Test Last Name') {
  //     router.push('/signup')
  //   }
  // }, [user])

  

  return <div className={className}>{children}</div>
}

export default SecurePage

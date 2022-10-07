import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { IUser } from 'services/types'
import { fetcher } from 'lib/fetcher'

export const useUser = ({ redirectTo = '', redirectIfFound = false } = {}) => {
  const { data: user, mutate: mutateUser } = useSWR<IUser & { isLoggedIn: true }>('/api/user/get', fetcher)

  useEffect(() => {
    if (!redirectTo || !user) return

    if ((redirectTo && !redirectIfFound && !user?.isLoggedIn) || (redirectIfFound && user?.isLoggedIn)) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}

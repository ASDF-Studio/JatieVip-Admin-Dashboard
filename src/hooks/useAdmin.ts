import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { async } from 'rxjs'
import { AdminService } from 'services'
import { IUser } from 'services/types'
import useSWR from 'swr'
import { useUser } from './useUser'
import { useAuth } from 'Contexts/Auth'
import { debounce, isEmpty } from 'lodash'

type ActionType = 'offset'

type Action = {
  type: ActionType
  payload: number
}

type StateType = {
  offset: number
}

const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case 'offset':
      return {
        ...state,
        offset: action.payload,
      }
      break
    default:
      return
  }
}

const initState: StateType = {
  offset: 0,
}

export const useAdmin = () => {
  // const [state, dispatch] = useReducer(reducer, initState)
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<number>()
  const { user } = useAuth()
  const { id } = user || {}
  const [page, setPage] = useState(0)

  const req = async (offset: number) => {
    try {
      setLoading(true)
      const res = await AdminService.getUsers({
        offset: offset,
      })
      setUsers(res.data.users)
      setCount(res.data.count)
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  const reFetch = () => {
    req(page)
  }

  useEffect(() => {
    req(page)
  }, [page])

  const debouncedSearch = useMemo(() => {
    return debounce(async (value) => {
      if (isEmpty(value)) {
        req(page)
      } else {
        const res = await AdminService.searchUser({
          loggedInUserId: id,
          searchWord: value,
        })
        setUsers(res.data)
      }
    }, 300)
  }, [id, page])

  // useEffect(() => {
  //   req(0)
  // }, [])

  const changePage = (page: number) => {
    setPage(page * 20)
  }

  return {
    users,
    loading,
    changePage,
    count,
    debouncedSearch,
    page,
    reFetch
  }
}

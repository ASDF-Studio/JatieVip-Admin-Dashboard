import { useCallback, useEffect, useReducer, useState } from 'react'
import { async } from 'rxjs'
import { AdminService } from 'services'
import { IUser } from 'services/types'
import useSWR from 'swr'

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
  const [state, dispatch] = useReducer(reducer, initState)
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<number>()
  

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

  // useEffect(() => {
  //   req(0)
  // }, [])

  const changePage = (page: number) => {
    req(page * 20)
  }

  return {
    users,
    loading,
    changePage,
    count,

  }
}

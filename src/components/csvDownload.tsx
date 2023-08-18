import { Typography } from '@mui/material'
import { tableData } from '../constants'
import { isArray, isEmpty } from 'lodash'
import { CSVLink } from 'react-csv'
import { AdminService } from 'services'
import { useEffect, useState } from 'react'

export const CSVDownload = ({ onClose }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    asyncData()
  }, [])

  const asyncData = async () => {
    try {
      setLoading(true)
      const res = await AdminService.getUsers({
        offset: 0,
      })
      const users = res.data.users

      const tableName = [
        'Id',
        'Username',
        'FullName',
        'Contact',
        'Date of Birth',
        'Followers Count',
        'Following Count',
        'Gender',
        'Is Admin',
        'Is Banned',
        'Is VIP',
        'Location',
        'Primary Email',
        'Profile Picture',
        'Profile Role',
        'Subscriptions Expiry Date',
        'Created at',
        'Updated at',
      ]

      const csvData = [
        tableName,
        ...users.map((user) => {
          return tableData.map((x) => {
            if (x === 'subscriptions' && !isEmpty(user[x])) {
              return user[x][0].expiryDate
            }
            if (isArray(user[x])) {
              return user[x].length
            }
            return user[x]
          })
        }),
      ]
      setData(csvData)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <CSVLink
      data={data}
      filename={'user_data.csv'}
      className={['px-[21px] hover:bg-fill-lightYellow py-[7px] w-full block', loading && 'pointer-events-none'].join(
        ' ',
      )}
      target="_blank"
    >
      <Typography className="text-black font-normal cursor-pointer">{loading ? 'Loading' : 'Export as CSV'}</Typography>
    </CSVLink>
  )
}

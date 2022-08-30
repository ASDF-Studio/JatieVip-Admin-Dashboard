import { Avatar } from '@mui/material'
import { FC } from 'react'

type Props = {
  url: string
}

export const Profile: FC<Props> = ({ url }) => {
  return (
    <div>
      <Avatar alt="profile image" src={url} />
    </div>
  )
}

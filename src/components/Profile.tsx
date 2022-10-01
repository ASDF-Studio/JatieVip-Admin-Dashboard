import { Avatar } from '@mui/material'
import { FC } from 'react'
import { PlaceholderIcon } from './icons'

type Props = {
  url: string
}

export const ProfilePicture: FC<Props> = ({ url = '' }) => {
  return (
    <Avatar src={url} className="w-[88px] h-[88px] bg-[#f5f7f9]">
      <PlaceholderIcon className="w-[30px] fill-[#9d9eb2]" />
    </Avatar>
  )
}

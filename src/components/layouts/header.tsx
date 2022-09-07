import { Typography, Avatar } from '@mui/material'
import { Button } from 'components/Button'
import { useNavigate } from 'hooks/UseRouter'
import React, { FC } from 'react'

type Props = {
  classNames?: string
  withNavBar?: boolean
}

export const Header: FC<Props> = ({ classNames = '', withNavBar = true }): React.ReactElement => {
  const { navigateTo } = useNavigate()

  return (
    <div
      className={`h-[66px] flex z-10 fixed w-full bg-white justify-between px-5 items-center border-b border-accent-white ${classNames}`}
    >
      <div className='hover:cursor-pointer' onClick={() => navigateTo('/')}>
        <img className="h-[28px] w-[104px]" src="/assets/logos/logo.svg" alt="move logo" />
      </div>

      {withNavBar && (
        <div className="flex gap-[50px] items-center h-full hover:cursor-pointer">
          <div className="flex flex-col border-b-[4px] h-full border-primary-brand justify-center">
            <Button variant="text">
              <Typography textTransform="capitalize" className="text-primary-black capitalize" variant="title3">
                Dashboard
              </Typography>
            </Button>
          </div>

          <div className="flex gap-[37px] h-full items-center hover:cursor-pointer">
            <div className="flex flex-col border-b-[4px] h-full border-transparent justify-center">
              <Button variant="text">
                <Typography textTransform="capitalize" className="text-primary-grey capitalize" variant="title3">
                  Profile
                </Typography>
              </Button>
            </div>
            <Avatar className="w-10 h-10" />
          </div>
        </div>
      )}
    </div>
  )
}

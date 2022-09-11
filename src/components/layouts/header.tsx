import {  Avatar } from '@mui/material'
import { Button } from 'components/Button'
import { useNavigate } from 'hooks/UseRouter'
import React, { FC } from 'react'

type Props = {
  classNames?: string
  withNavBar?: boolean
}

export const Header: FC<Props> = ({ classNames = '', withNavBar = true }): React.ReactElement => {
  const { navigateTo, pathname } = useNavigate()

  const isDashBoard = pathname === '/dashboard'
  const isAccount = pathname === '/account'

  return (
    <div
      className={`h-[66px] flex z-10 fixed w-full bg-white justify-between px-5 items-center border-b border-accent-white ${classNames}`}
    >
      <div className="hover:cursor-pointer" onClick={() => navigateTo('/')}>
        <img className="h-[28px] w-[104px]" src="/assets/logos/logo.svg" alt="move logo" />
      </div>

      {withNavBar && (
        <div className="flex gap-[50px] items-center h-full hover:cursor-pointer">
          <div
            className={`${
              isDashBoard ? 'border-primary-brand' : 'border-transparent'
            } flex flex-col border-b-[4px] h-full  justify-center`}
          >
            <Button
              onClick={() => navigateTo('/dashboard')}
              variant="text"
              textVariant="title3"
              disableRipple
              textClassName={isDashBoard ? 'text-primary-black' : 'text-primary-grey'}
            >
              Dashboard
            </Button>
          </div>

          <div className="flex gap-[37px] h-full items-center hover:cursor-pointer">
            <div
              className={`${
                isAccount ? 'border-primary-brand' : 'border-transparent'
              } flex flex-col border-b-[4px] h-full  justify-center`}
            >
              <Button
                onClick={() => navigateTo('/account')}
                variant="text"
                textVariant="title3"
                disableRipple
                textClassName={isAccount ? 'text-primary-black' : 'text-primary-grey'}
              >
                Profile
              </Button>
            </div>
            <Avatar className="w-10 h-10" />
          </div>
        </div>
      )}
    </div>
  )
}

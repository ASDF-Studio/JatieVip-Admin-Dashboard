import { Avatar } from '@mui/material'
import { Button } from 'components/Button'
import { Dashboard, UserIcon } from 'components/icons'
import { useAuth } from 'Contexts/Auth'
import { useBreakPoint } from 'hooks'
import { useNavigate } from 'hooks/UseRouter'
import React, { FC } from 'react'

type Props = {
  classNames?: string
  withNavBar?: boolean
  hidden?: boolean
}

export const Header: FC<Props> = ({ classNames = '', withNavBar = true, hidden }): React.ReactElement => {
  const { user } = useAuth()
  const { navigateTo, pathname } = useNavigate()
  const { isTablet } = useBreakPoint()

  const isDashBoard = pathname === '/dashboard'
  const isAccount = pathname === '/account'

  return (
    <div
      className={`h-[66px] flex z-10 fixed w-full bg-white ${
        withNavBar ? 'justify-between' : 'justify-center'
      }  px-5 items-center border-b border-accent-white ${classNames} ${hidden && 'x:hidden'}`}
    >
      <div className="hover:cursor-pointer" onClick={() => navigateTo('/')}>
        <img className="h-[35px] w-[121px]" src="/assets/logos/logo.svg" alt="move logo" />
      </div>

      {withNavBar && (
        <div className="flex gap-[23px] sm:gap-[50px] items-center h-full hover:cursor-pointer">
          <div
            className={`${
              isDashBoard ? 'border-primary-brand' : 'border-transparent'
            } flex flex-col border-b-[4px] h-full  justify-center items-center w-[30px] sm:w-full`}
          >
            {!isTablet ? (
              <Dashboard className="w-[18px]" />
            ) : (
              <Button
                onClick={() => navigateTo('/dashboard')}
                variant="text"
                textVariant="title3"
                disableRipple
                textClassName={isDashBoard ? 'text-primary-black' : 'text-primary-grey'}
              >
                Dashboard
              </Button>
            )}
          </div>

          <div className="flex gap-[23px] sm:gap-[37px] h-full items-center hover:cursor-pointer">
            <div
              className={`${
                isAccount ? 'border-primary-brand' : 'border-transparent'
              } flex flex-col border-b-[4px] h-full  justify-center items-center w-[30px] sm:w-full`}
            >
              {!isTablet ? (
                <UserIcon className="w-[16px] fill-[#86949f]" />
              ) : (
                <Button
                  onClick={() => navigateTo('/account')}
                  variant="text"
                  textVariant="title3"
                  disableRipple
                  textClassName={isAccount ? 'text-primary-black' : 'text-primary-grey'}
                >
                  Profile
                </Button>
              )}
            </div>
            <Avatar src={user?.photo} className="w-[35px] h-[35px] sm:w-10 sm:h-10" />
          </div>
        </div>
      )}
    </div>
  )
}

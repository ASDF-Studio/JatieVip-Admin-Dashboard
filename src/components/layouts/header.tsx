import { Avatar, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { Button } from 'components/Button'
import { Dashboard, UserIcon } from 'components/icons'
import { useAuth } from 'Contexts/Auth'
import { useBreakPoint } from 'hooks'
import { useNavigate } from 'hooks/UseRouter'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useState } from 'react'

type Props = {
  classNames?: string
  withNavBar?: boolean
  hidden?: boolean
}

export const Header: FC<Props> = ({ classNames = '', withNavBar = true, hidden }): React.ReactElement => {
  const { user, logOut } = useAuth()
  const { navigateTo, pathname } = useNavigate()
  const { isTablet } = useBreakPoint()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const router = useRouter()

  const isDashBoard = pathname === '/'
  const isAccount = pathname === '/account'

  const handleLogOut = async () => {
    try {
      logOut()
      await router.push('/login')
    } catch (e) {
      console.log(e)
    }
  }

  const listenClickEvent = (e) => {
    if (showProfileMenu) {
      const el = document.getElementById('user-menu')
      if (!el.contains(e.target)) {
        setShowProfileMenu(false)
      }
    }
  }

  console.log(user)

  useEffect(() => {
    document.addEventListener('click', listenClickEvent)

    return () => document.removeEventListener('click', listenClickEvent)
  }, [showProfileMenu])

  return (
    <div
      className={`h-[66px] flex z-10 fixed w-full bg-white ${
        withNavBar ? 'justify-between' : 'justify-center'
      }  px-5 items-center border-b border-accent-white ${classNames} ${hidden && 'x:hidden'}`}
    >
      <div className="hover:cursor-pointer" onClick={() => navigateTo('/')}>
        <img className="h-[65px] w-[121px]" src="/assets/logos/jatieVIP2.svg" alt="move logo" />
      </div>

      {withNavBar && (
        <div className="flex gap-[23px] sm:gap-[50px] items-center h-full">
          <div
            className={`${
              isDashBoard ? 'border-primary-brand' : 'border-transparent'
            } flex flex-col border-b-[4px] h-full  justify-center items-center w-[30px] sm:w-full`}
          >
            {!isTablet ? (
              <IconButton className="p-0" disableRipple onClick={() => navigateTo('/')}>
                <Dashboard className="w-[18px]" />
              </IconButton>
            ) : (
              <Button
                onClick={() => navigateTo('/')}
                variant="text"
                textVariant="title3"
                disableRipple
                textClassName={isDashBoard ? 'text-primary-black' : 'text-primary-grey'}
              >
                Dashboard
              </Button>
            )}
          </div>

          <div className="flex gap-[23px] sm:gap-[37px] h-full items-center">
            <div
              className={`${
                isAccount ? 'border-primary-brand' : 'border-transparent'
              } flex flex-col border-b-[4px] h-full  justify-center items-center w-[30px] sm:w-full`}
            >
              {!isTablet ? (
                <IconButton className="p-0" disableRipple onClick={() => navigateTo('/account')}>
                  <UserIcon className="w-[16px] fill-[#86949f]" />
                </IconButton>
              ) : (
                <Button
                  onClick={() => navigateTo('/account')}
                  variant="text"
                  textVariant="title3"
                  disabled
                  disableRipple
                  textClassName={isAccount ? 'text-primary-black' : 'text-primary-grey'}
                >
                  Profile
                </Button>
              )}
            </div>
            <div id="user-menu" className="relative">
              <IconButton className="p-0" disableRipple onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <Avatar
                  src={user?.profilePic}
                  className={`w-[35px] h-[35px] sm:w-10 sm:h-10  ${
                    showProfileMenu && ' border-[2px] border-primary-brand'
                  }`}
                />
              </IconButton>

              {showProfileMenu && (
                <div className="absolute w-[174px] py-[17px] -right-[20px] sm:right-0 bg-white shadow-selectShadow border border-[#e5e7ec] rounded-[12px] top-[40px]  sm:top-[45px]">
                  <div
                    onClick={() => {
                      handleLogOut()
                      setShowProfileMenu(false)
                    }}
                    className="px-[21px] hover:bg-[#f5f7f9] py-[7px]"
                  >
                    <Typography className="font-[16px] text-black font-normal">Logout</Typography>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

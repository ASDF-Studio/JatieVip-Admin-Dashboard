import React, { FC } from 'react'
import { Profile } from 'components'

type Props = {
  classNames?: ''
  withNavBar?: boolean
}

export const Header: FC<Props> = ({ classNames, withNavBar = true }): React.ReactElement => {
  return (
    <div className={`h-[66px] flex fixed w-full justify-between px-6 items-center ${classNames}`}>
      <img className="h-[28px] w-[104px]" src="/assets/logos/logo3x.webp" alt="move logo" />
      {withNavBar && (
        <div className="flex gap-[50px] items-center">
          {/* <TextButton className="h-[66px]" selected>
            Dashboard
          </TextButton> */}
          <div className="flex gap-[37px]">
            <TextButton>Profile</TextButton>
            <Profile />
          </div>
        </div>
      )}
    </div>
  )
}

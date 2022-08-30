import React, { FC } from 'react'
import { Profile } from 'components'

type Props = {
  classNames?: ''
  withNavBar?: boolean
}

export const Header: FC<Props> = ({ classNames, withNavBar = true }): React.ReactElement => {
  return (
    <div className={`h-[66px] flex fixed bg-black w-full justify-between px-6 items-center ${classNames}`}>
      <img
        className="h-[28px] w-[104px]"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
      />
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

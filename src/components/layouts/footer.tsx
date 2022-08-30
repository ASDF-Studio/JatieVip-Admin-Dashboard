import React, { FC } from 'react'

type Props = {
  classNames?: ''
}

export const Footer: FC<Props> = ({ classNames }): React.ReactElement => {
  return <div className={`h-[66px] ${classNames}`}>dwq</div>
}

import React from 'react'
import { FC } from 'react'
import { LandingFooter } from './footer'
import { LandingHeader } from './header'

type Props = {
  children: React.ReactNode
  ref?: any
  inView?: boolean
  dark?: boolean
}

export const LandingLayout: FC<Props> = React.forwardRef(({ children, inView, dark = false }, ref) => {
  return (
    <div className="flex flex-col relative">
      <LandingHeader inView={inView} dark={dark} />
      {children}
      <LandingFooter ref={ref} />
    </div>
  )
})

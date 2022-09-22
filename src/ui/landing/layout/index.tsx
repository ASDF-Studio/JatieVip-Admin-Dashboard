import { FC } from 'react'
import { LeftBar } from '../left-bar'
import { LandingFooter } from './footer'
import { LandingHeader } from './header'

type Props = {
  children: React.ReactNode
}

export const LandingLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col relative">
      <LandingHeader />
      <LeftBar />
      {children}
      <LandingFooter />
    </div>
  )
}

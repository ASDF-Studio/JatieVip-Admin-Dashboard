import { FC, ReactElement } from 'react'
import { Footer } from './footer'
import { Header } from './header'

type Props = {
  children: ReactElement
  footer?: boolean
  withNavBar?: boolean
  className?: string
  stickyFooter?: boolean
}

const MainLayout: FC<Props> = ({
  children,
  footer = true,
  withNavBar = true,
  className = '',
  stickyFooter = false,
}): React.ReactElement => {
  return (
    <div className="flex flex-col">
      <Header withNavBar={withNavBar} />
      <main className={`${className}  w-full relative`}>{children}</main>
      {footer && <Footer sticky={stickyFooter} />}
    </div>
  )
}
export default MainLayout

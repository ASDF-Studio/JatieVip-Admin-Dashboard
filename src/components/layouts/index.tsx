import { FC, ReactElement } from 'react'
import { Footer } from './footer'
import { Header } from './header'

type Props = {
  children: ReactElement
  footer?: boolean
  withNavBar?: boolean
  className?: string
}

const MainLayout: FC<Props> = ({ children, footer = true, withNavBar = true, className = "" }): React.ReactElement => {
  return (
    <div>
      <Header withNavBar={withNavBar} />
      <main className={`${className} min-h-screen w-full relative`}>{children}</main>
      {footer && <Footer />}
    </div>
  )
}
export default MainLayout

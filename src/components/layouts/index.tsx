import { FC, ReactElement } from 'react'
import { Footer } from './footer'
import { Header } from './header'

type Props = {
  children: ReactElement
  footer?: boolean
  withNavBar?: boolean
}

const MainLayout: FC<Props> = ({ children, footer = true, withNavBar = true }): React.ReactElement => {
  return (
    <div className='flex flex-col h-screen w-full'>
      <Header withNavBar={withNavBar} />
      <main className='grow'>{children}</main>
      {footer && <Footer />}
    </div>
  )
}
export default MainLayout

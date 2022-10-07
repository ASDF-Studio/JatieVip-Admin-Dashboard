import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { AuthProvider } from 'Contexts/Auth'
import { ThemeProvider } from 'theme'
import NProgress from 'nprogress'
import { IUser } from 'services/types'
import { useEffect, useState } from 'react'
import { Router } from 'next/router'

const MyApp = ({ Component, pageProps, user }: AppProps & { user: IUser }) => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <AuthProvider userContext={user}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp

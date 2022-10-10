import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { ThemeProvider } from 'theme'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { Router } from 'next/router'



const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

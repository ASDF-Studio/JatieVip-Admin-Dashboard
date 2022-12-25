import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { Router } from 'next/router'
import TagManager from 'react-gtm-module'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NNSC655' })
  }, [])

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

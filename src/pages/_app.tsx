import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { Router } from 'next/router'
import TagManager from 'react-gtm-module'
import Script from 'next/script'

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
    <>
      <Script id="omnisend-script" type="text/javascript" strategy="afterInteractive">
        {`
          window.omnisend = window.omnisend || [];
          omnisend.push(["accountID", "6398ed6cad1251dab940b146"]);
          omnisend.push(["track", "$pageViewed"]);
          !function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://omnisnippet1.com/inshop/launcher-v2.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();
        `}
      </Script>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp

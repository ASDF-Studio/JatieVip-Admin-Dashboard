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
      <Script id="omnisend-id" strategy="afterInteractive" type="text/javascript">
        {`
    window.omnisend = window.omnisend || [];
    omnisend.push(["accountID", "6398ed6cad1251dab940b146"]);
    omnisend.push(["track", "$pageViewed"]);
    !function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://omnisnippet1.com/inshop/launcher-v2.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();
        `}
      </Script>
      <Script id="tiktok-pixel" strategy="afterInteractive" type="text/javascript">
        {`
        !(function (w, d, t) {
          w.TiktokAnalyticsObject = t;
          var ttq = (w[t] = w[t] || []);
          (ttq.methods = [
            'page',
            'track',
            'identify',
            'instances',
            'debug',
            'on',
            'off',
            'once',
            'ready',
            'alias',
            'group',
            'enableCookie',
            'disableCookie',
          ]),
            (ttq.setAndDefer = function (t, e) {
              t[e] = function () {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
              };
            });
          for (var i = 0; i < ttq.methods.length; i++)
            ttq.setAndDefer(ttq, ttq.methods[i]);
          (ttq.instance = function (t) {
            for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
              ttq.setAndDefer(e, ttq.methods[n]);
            return e;
          }),
            (ttq.load = function (e, n) {
              var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
              (ttq._i = ttq._i || {}),
                (ttq._i[e] = []),
                (ttq._i[e]._u = i),
                (ttq._t = ttq._t || {}),
                (ttq._t[e] = +new Date()),
                (ttq._o = ttq._o || {}),
                (ttq._o[e] = n || {});
              n = document.createElement('script');
              (n.type = 'text/javascript'),
                (n.async = !0),
                (n.src = i + '?sdkid=' + e + '&lib=' + t);
              e = document.getElementsByTagName('script')[0];
              e.parentNode.insertBefore(n, e);
            });
        
          ttq.load('CFVVSUBC77U15JQ5O0C0');
          ttq.page();
        })(window, document, 'ttq');
        `}
      </Script>
      <Script id="facebook-pixel" strategy="afterInteractive" type="text/javascript">
        {`
        !function(f,b,e,v,n,t,s)
        
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        
        n.queue=[];t=b.createElement(e);t.async=!0;
        
        t.src=v;s=b.getElementsByTagName(e)[0];
        
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', '1514721622389790');
        
        fbq('track', 'PageView');
        
        `}
      </Script>
      {/* <noscript>
        {`
        <img height="1" width="1"
        src="https://www.facebook.com/tr?id=1514721622389790&ev=PageView
        &noscript=1"/>
        `}
      </noscript> */}
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp

import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { AuthProvider } from 'Contexts/Auth'
import { ThemeProvider } from 'theme'
import App from 'next/app'
import NProgress from 'nprogress'
import { IUser } from 'services/types'
import { getIronSession } from 'iron-session'
import { sessionOptions } from 'lib/session'
import { AuthService } from 'services'
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

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context)

  if (context.ctx.pathname === '/landing') {
    return {
      ...pageProps,
    }
  }

  if (context.ctx.req && context.ctx.res) {
    const { token, destroy } = await getIronSession(context.ctx.req, context.ctx.res, sessionOptions)

    if (context.ctx.pathname === '/login') {
      if (!token) {
        return {
          ...pageProps,
        }
      }
    }

    if (!token) {
      context.ctx.res.writeHead(302, {
        Location: '/login',
        'Content-Type': 'text/html; charset=utf-8',
      })

      context.ctx.res.end()

      return {
        ...pageProps,
      }
    }

    try {
      const user = await AuthService.getAccount({ token })

      return {
        ...pageProps,
        user,
      }
    } catch (e) {
      destroy()
    }
  }

  return {
    ...pageProps,
  }
}

export default MyApp

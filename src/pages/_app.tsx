import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'Contexts/Auth'
import { ThemeProvider } from 'theme'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp

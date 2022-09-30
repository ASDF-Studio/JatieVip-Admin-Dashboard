import Document, { Html, Head, Main, NextScript } from 'next/document'
import { mediaStyles } from '../theme/media'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
          <link href="http://fonts.cdnfonts.com/css/avenir-next-lt-pro" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

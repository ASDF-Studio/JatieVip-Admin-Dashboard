import Document, { Html, Head, Main, NextScript, Body } from 'next/document'
import Script from 'next/script'
import { mediaStyles } from '../theme/media'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
          <link href="http://fonts.cdnfonts.com/css/avenir-next-lt-pro" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="description" content="See amazing fitness results in 3-months" key="desc" />
          <meta property="og:title" content="Move your way" />
          <meta property="og:description" content="See amazing fitness results in 3-months" />
          <meta property="og:image" content="/assets/videos/poster.jpg" />
        </Head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNSC655');`}
        </Script>
        <Body>
          <div>ewqewqewqewq</div>
          <Main />
          <NextScript />
        </Body>

        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NNSC655');`}
        </Script>
      </Html>
    )
  }
}

export default MyDocument

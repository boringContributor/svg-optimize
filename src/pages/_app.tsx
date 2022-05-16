import { GeistProvider, CssBaseline } from '@geist-ui/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../../styles/globals.css'

function Main({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <Head>
        <title>SVG Optimize</title>
        <meta name="description" content="Optimize your SVG files" />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default Main

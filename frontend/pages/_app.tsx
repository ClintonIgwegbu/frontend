import '@styles/global/general.scss';
import '@styles/global/ProseMirror.scss';
import '@styles/global/ReactTabs.scss';
import type { AppProps } from 'next/app';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src='https://kit.fontawesome.com/d07f7b50ae.js'></Script>
      <Component {...pageProps} />
    </>
  );
}

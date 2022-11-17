import '../styles/globals.css'
import type { AppProps } from 'next/app'

import UserIcon from "../assets/user.svg";
import githubIcon from "./../assets/github.svg"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

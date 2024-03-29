import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import "@/styles/globals.css"
import { store } from "../store/store"
import Header from "@/components/header"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}

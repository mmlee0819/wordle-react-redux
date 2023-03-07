import Head from "next/head"
import { Inter } from "next/font/google"
import Game from "./game"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Wordle by Mika</title>
        <meta name="description" content="Wordle by Mika" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-black">
        <Game />
      </main>
    </>
  )
}

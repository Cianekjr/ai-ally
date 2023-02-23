import Layout from '@components/Layout'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>XMapp</title>
        <meta name="description" content="Discover the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
      </Layout>
    </div>
  )
}

export default Home

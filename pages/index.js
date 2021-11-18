import Head from 'next/head'
import Layout from '../components/shared/Layout.js'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Digital Concierge Desk Dashboard</title>
        <meta name="description" content="Digital Concierge Desk Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>Dashboard</main>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

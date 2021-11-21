import Head from 'next/head'
import Layout from '../components/shared/Layout.js'
import React from 'react'
import { isAuthenticated } from '../lib/utils'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Digital Concierge Desk Dashboard</title>
        <meta name="description" content="Digital Concierge Desk Dashboard" />
        <link rel="icon" href="../public/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </main>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ req }) {
  return isAuthenticated(req.cookies.authToken)
}

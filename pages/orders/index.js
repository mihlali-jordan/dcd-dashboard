import Layout from '../../components/shared/Layout.js'
import React from 'react'

export default function Orders() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
    </div>
  )
}

Orders.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

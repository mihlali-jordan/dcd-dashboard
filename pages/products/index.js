import Layout from '../../components/shared/Layout.js'
import React from 'react'

export default function Products() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
    </div>
  )
}

Products.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

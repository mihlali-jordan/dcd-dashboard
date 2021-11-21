import Layout from '../../components/shared/Layout.js'
import React from 'react'
import { isAuthenticated } from '../../lib/utils'

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

export async function getServerSideProps({ req }) {
  return isAuthenticated(req.cookies.authToken)
}

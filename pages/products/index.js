import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

import Layout from '../../components/shared/Layout.js'
import { isAuthenticated } from '../../lib/utils'

async function getProducts() {
  const { data } = await axios.get('/api/products/fetch')

  return data
}

export default function Products() {
  const { data, isLoading } = useQuery('products', getProducts)
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

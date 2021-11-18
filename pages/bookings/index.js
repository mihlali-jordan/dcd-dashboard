import Layout from '../../components/shared/Layout.js'
import React from 'react'

export default function Bookings() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
    </div>
  )
}

Bookings.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

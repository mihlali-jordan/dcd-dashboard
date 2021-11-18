import Layout from '../../components/shared/Layout.js'

export default function Bookings() {
  return (
    <div>
      <h1>Bookings Screen</h1>
    </div>
  )
}

Bookings.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

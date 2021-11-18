import Layout from '../../components/shared/Layout.js'

export default function Orders() {
  return (
    <div>
      <h1>Orders Screen</h1>
    </div>
  )
}

Orders.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

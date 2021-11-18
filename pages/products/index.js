import Layout from '../../components/shared/Layout.js'

export default function Products() {
  return (
    <div>
      <h1>Products Screen</h1>
    </div>
  )
}

Products.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

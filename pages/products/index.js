import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

// Components
import Layout from '../../components/shared/Layout.js'
import AppTable from '../../components/shared/AppTable.js'
import { Button, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import AppDrawer from '../../components/shared/AppDrawer.js'

import { isAuthenticated } from '../../lib/utils'

async function getProducts() {
  const { data } = await axios.get('/api/products/fetch')

  return data.data
}

export default function Products() {
  const { data, isLoading } = useQuery('products', getProducts)
  const { isOpen, onClose, onOpen } = useDisclosure()

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'product_name',
      },
      {
        Header: 'Price',
        accessor: 'product_price',
      },
      {
        Header: 'Stock Count',
        accessor: 'stock_count',
      },
      {
        Header: 'Category',
        accessor: 'product_category',
      },
      {
        Header: 'Product Code',
        accessor: 'product_code',
      },
    ],
    []
  )

  const tableData = React.useMemo(() => {
    if (!data) {
      return []
    }

    return [...data]
  }, [data])

  return (
    <div>
      <AppDrawer onClose={onClose} isOpen={isOpen} header="Add a Product">
        <h1>Hello</h1>
      </AppDrawer>
      <h1 className="text-3xl font-semibold text-primary-default">Products</h1>
      <h3 className="text-xl text-tertiary-default">
        Manage your product catalogue
      </h3>
      <div className="flex justify-end w-full">
        <Button variant="solid" colorScheme="brand.secondary" onClick={onOpen}>
          Add new product
        </Button>
      </div>
      <div className="my-6">
        {isLoading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <AppTable columns={columns} data={tableData} />
        )}
      </div>
    </div>
  )
}

Products.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ req }) {
  return isAuthenticated(req.cookies.authToken)
}

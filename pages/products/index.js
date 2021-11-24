// Libraries
import React from 'react'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import * as yup from 'yup'

// Components
import Layout from '../../components/shared/Layout.js'
import AppTable from '../../components/shared/AppTable.js'
import { Button, Input, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import AppDrawer from '../../components/shared/AppDrawer.js'
import FormInput from '../../components/form/FormInput.js'
import FormSelect from '../../components/form/FormSelect.js'
import ImageUploading from 'react-images-uploading'
import AppImageUpload from '../../components/shared/AppImageUpload.js'
import Image from 'next/image'

// Hooks
import { useForm } from 'react-hook-form'
import { useCustomToast } from '../../lib/hooks/useCustomToast.js'

// Utils
import { isAuthenticated } from '../../lib/utils'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.umd.js'

async function getProducts() {
  const { data } = await axios.get('/api/products/fetch')

  return data.data
}

async function addProduct(payload) {
  await axios.post('/api/products/create', payload)
}

async function getVendor() {
  const { data } = await axios.get('/api/profile')

  return data.data[0]
}

const productSchema = yup.object({
  product_category: yup.string().required(),
  stock_count: yup.number().required(),
  product_name: yup.string().required(),
  product_price: yup.number().required(),
  product_code: yup.string().required(),
})

export default function Products() {
  const toast = useCustomToast()
  const queryClient = useQueryClient()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      stock_count: 44,
      product_name: 'W11',
      product_price: 102.0,
      product_code: 'Lewis Hamilton',
    },
  })
  const [formId, setFormId] = React.useState('')
  const [productImages, setProductImages] = React.useState([])

  // Queries
  const { data, isLoading } = useQuery('products', getProducts)
  const { mutate: addProductMutation, isLoading: isLoadingMutation } =
    useMutation(product => addProduct(product), {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
        toast({
          title: 'Product added successfully',
          status: 'success',
        })
      },
      retry: 3,
    })
  const { data: user, isLoading: isLoadingUser } = useQuery('user', getVendor)

  const handleAddProduct = values => {
    // addProductMutation(values)
    console.log(values)
  }

  const handleImageChange = imageList => {
    console.log(imageList)
    setProductImages(imageList)
  }

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
      <AppDrawer
        formId={formId}
        onClose={onClose}
        isOpen={isOpen}
        header="Add a Product"
      >
        <form
          id="add-product"
          className="space-y-3"
          onSubmit={handleSubmit(handleAddProduct)}
        >
          <AppImageUpload value={productImages} onChange={handleImageChange} />
          <div className="flex justify-between space-x-5">
            <FormInput
              label="Product Name"
              name="product_name"
              placeholder="Enter a name for your product"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Product Price"
              name="product_price"
              placeholder="E.g. 2300.00"
              control={control}
              errors={errors}
              type="number"
            />
          </div>
          <div className="flex justify-between space-x-5">
            <FormInput
              label="Product Code"
              name="product_code"
              placeholder="Enter a unique product code for the product"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Stock Count"
              name="stock_count"
              placeholder="E.g. 20"
              control={control}
              errors={errors}
              type="number"
            />
          </div>
          <div className="flex justify-between space-x-5">
            {!isLoadingUser ? (
              <FormSelect
                errors={errors}
                control={control}
                name="product_category"
                label="Product Category"
                options={user.product_categories}
                placeholder="Select a category"
              />
            ) : null}
          </div>
        </form>
      </AppDrawer>
      <h1 className="text-3xl font-semibold text-primary-default">Products</h1>
      <h3 className="text-xl text-tertiary-default">
        Manage your product catalogue
      </h3>
      <div className="flex justify-end w-full">
        <Button
          variant="solid"
          colorScheme="brand.secondary"
          onClick={() => {
            onOpen()
            setFormId('add-product')
          }}
        >
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

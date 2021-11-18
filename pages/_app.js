// 3rd Party imports
import React from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

// Local imports
import { queryClient } from '../lib/config/reactquery.js'

// Styling
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import theme from '../lib/config/theme.js'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(
        <ChakraProvider theme={theme}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Component {...pageProps} />
        </ChakraProvider>
      )}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp

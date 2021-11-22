// 3rd Party imports
import React from 'react'
import { Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

// Local imports
import { queryClient as queryClientConfig } from '../lib/config/reactquery.js'

// Styling
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import theme from '../lib/config/theme.js'

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page)

  const [queryClient] = React.useState(queryClientConfig)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
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
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp

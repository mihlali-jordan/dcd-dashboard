import { QueryClient } from 'react-query'
import theme from './theme.js'
import { createStandaloneToast } from '@chakra-ui/react'
import { v4 as uuidV4 } from 'uuid'

const toast = createStandaloneToast({ theme })

export function queryErrorHandler(error) {
  const id = uuidV4()
  const title =
    error instanceof Error
      ? // remove the initial 'Error: ' that accompanies many errors
        error.toString().replace(/^Error:\s*/, '')
      : 'error connecting to server'
  toast.closeAll()
  toast({ id, title, status: 'error', variant: 'solid', isClosable: true })
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
})

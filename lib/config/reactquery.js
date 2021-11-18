import { QueryClient } from 'react-query'
import { toast } from 'react-toastify'

export function queryErrorHandler(error) {
  const title =
    error instanceof Error
      ? // remove the initial 'Error: ' that accompanies many errors
      error.toString().replace(/^Error:\s*/, '')
      : 'error connecting to server'
  toast.error(`${title}`)
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      // staleTime: 60000,
      // cacheTime: 90000,
      // refetchOnMount: false,
      // refetchOnReconnect: true,
      // refetchOnWindowFocus: false,
    },
    mutations: {
      onError: queryErrorHandler,
    },
  },
})

import { useToast } from '@chakra-ui/react'

export function useCustomToast() {
  return useToast({
    isClosable: true,
    variant: 'solid',
    position: 'top',
    duration: 3000,
  })
}

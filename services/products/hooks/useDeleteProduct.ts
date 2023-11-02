import { useMutation, useQueryClient } from 'react-query'
import { ProductServices } from '../ProductServices'
export function useDeleteProduct() {
  const { isLoading, data, isSuccess, mutate,isError } = useMutation(
    'createProduct',
    (data: FormData) => ProductServices.deleteProducts(data)
  )
  return { data, isLoading, isSuccess, mutate,isError }
}

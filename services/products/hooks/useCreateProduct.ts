import { useMutation, useQueryClient } from 'react-query'
import { ProductServices } from '../ProductServices'
export function useCreateProduct() {
  const queryClient = useQueryClient()

  const { isLoading, data, isSuccess, mutate,isError } = useMutation(
    'createProduct',
    (data: any) => ProductServices.postProduct(data)
    ,
    {
      onSuccess: () => {
        handleOnSuccess()
      }
    }
  )
  const handleOnSuccess = () => {
    queryClient.invalidateQueries('useProducts') // Assuming the query key for the list is "useGetProducts"
  }
  return { data, isLoading, isSuccess, mutate,isError }

}

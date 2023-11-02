import { useMutation, useQueryClient } from 'react-query'
import { ProductServices } from '../ProductServices'

export function useEditProduct() {
  const queryClient = useQueryClient()
  const { data, isLoading, isSuccess, mutate,isError} = useMutation<
    void,
    unknown,
    { id: string; newData: FormData }
  >('updateProduct', data => ProductServices?.updateProduct(data), {
    onSuccess: () => {
      handleOnSuccess()
    }
  })

  const handleOnSuccess = () => {
    queryClient.invalidateQueries('useProducts') // Assuming the query key for the list is "useGetProducts"
  }
  return { data, isLoading, isSuccess, mutate ,isError}
}

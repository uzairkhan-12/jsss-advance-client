import { useQuery } from 'react-query'
import { ProductServices } from '../ProductServices'

export function useGetProducts(id: string) {
  const { isLoading, data, isSuccess,isError } = useQuery(['useProducts', id], () =>
    ProductServices.getProducts(id)
  )
  return { data, isLoading, isSuccess,isError }
}

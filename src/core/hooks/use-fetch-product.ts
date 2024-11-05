import useMutation from 'swr/mutation';
import axios from 'axios';

/**
 * @name useFetchProductMutation
 */
function useFetchProductMutation() {
  const key = ['fetch-product'];

  return useMutation(key, async (_, { arg: id }: { arg: string }) => {
    return await axios
      .get(`/api/products/fetch?id=${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(
          error.response.data.message || 'Failed to fetch products',
        );
      });
  });
}

export default useFetchProductMutation;

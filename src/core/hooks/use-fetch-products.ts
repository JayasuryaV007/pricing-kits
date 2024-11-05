import useMutation from 'swr/mutation';
import axios from 'axios';

/**
 * @name useFetchProductMutation
 */
function useFetchProductMutation() {
  const key = ['fetch-products'];

  return useMutation(key, async (_, { arg: userId }: { arg: string }) => {
    return await axios
      .get(`/api/products?user_id=${userId}`)
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

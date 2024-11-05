import useMutation from 'swr/mutation';
import axios from 'axios';
import { Products } from '~/types/products';

/**
 * @name useUpdateProduct
 */
function useUpdateProduct() {
  const key = ['api', 'update-product'];

  return useMutation(
    key,
    async (_, { arg: credentials }: { arg: Products }) => {
      return await axios
        .put('/api/products', credentials)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(
            error.response.data.error || 'Failed to update Product',
          );
        });
    },
  );
}

export default useUpdateProduct;

import useMutation from 'swr/mutation';
import axios from 'axios';
import { Products } from '~/types/products';

/**
 * @name useCreateProduct
 */
function useCreateProduct() {
  const key = ['api', 'create-product'];

  return useMutation(
    key,
    async (_, { arg: credentials }: { arg: Products }) => {
      return await axios
        .post('/api/products', credentials)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(
            error.response.data.error || 'Failed to create Product',
          );
        });
    },
  );
}

export default useCreateProduct;

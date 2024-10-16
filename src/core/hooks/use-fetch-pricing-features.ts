import useMutation from 'swr/mutation';
import axios from 'axios';

interface Credentials {
  url: string;
}

/**
 * @name useSignInWithEmailPassword
 */
function useFetchPricingFeatures() {
  const key = ['use-fetch-pricing-features'];

  return useMutation(
    key,
    async (_, { arg: credentials }: { arg: Credentials }) => {
      return await axios
        .post('/api/fetchFeatures', credentials)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(
            error.response.data.error || 'Failed to fetch Pricing Features',
          );
        });
    },
  );
}

export default useFetchPricingFeatures;

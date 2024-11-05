import useMutation from 'swr/mutation';
import axios from 'axios';

/**
 * @name useAddTooltipMutation
 */
function useAddTooltipMutation() {
  const key = ['add-tooltip'];

  return useMutation(key, async (_, { arg: formData }: { arg: FormData }) => {
    return await axios
      .post('/api/tooltip/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error.response?.data?.error || 'Failed to add tooltip');
      });
  });
}

export default useAddTooltipMutation;

import axios from 'axios';
import useMutation from 'swr/mutation';

function useFetchSVGsMutation() {
  const key = ['fetch-svgs'];

  return useMutation(key, (_) => {
    return axios
      .get('/api/image/list')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw new Error(error.response.data.error);
      });
  });
}

export default useFetchSVGsMutation;

import axios from 'axios';
import useMutation from 'swr/mutation';
import svgContentRequest from '../session/types/svg-fetch-request';

function useFetchSVGContentMutation() {
  const key = ['fetch-svg-content'];

  return useMutation(key, (_, { arg }: { arg: svgContentRequest }) => {
    return axios
      .post('/api/image/fetch', arg)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw new Error(error.response.data.error);
      });
  });
}

export default useFetchSVGContentMutation;

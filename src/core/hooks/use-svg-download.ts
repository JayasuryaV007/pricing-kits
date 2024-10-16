import axios from 'axios';
import useMutation from 'swr/mutation';
import svgContentRequest from '../session/types/svg-fetch-request';

function useDownloadSVGMutation() {
  const key = ['download-svg'];

  return useMutation(key, (_, { arg }: { arg: svgContentRequest }) => {
    return axios
      .post('/api/image/download', arg)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log('error: ', error);
        throw new Error(error.response.data.error);
      });
  });
}

export default useDownloadSVGMutation;

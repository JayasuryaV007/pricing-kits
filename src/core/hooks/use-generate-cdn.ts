import useMutation from 'swr/mutation';
import axios from 'axios';

type Credentials = {
  projectId: string;
  tooltips: any;
  metadata: any;
};

/**
 * @name useGenerateCDNMutation
 */
function useGenerateCDNMutation() {
  const key = ['generate-cdn'];

  return useMutation(
    key,
    async (
      _,
      { arg: { projectId, tooltips, metadata } }: { arg: Credentials },
    ) => {
      return await axios
        .post(`/api/generate-cdn`, { projectId, tooltips, metadata })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(
            error.response.data.message || 'Failed to fetch tooltip',
          );
        });
    },
  );
}

export default useGenerateCDNMutation;

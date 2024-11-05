import useMutation from 'swr/mutation';
import axios from 'axios';

type Credentials = {
  projectId: string;
  userId: string;
};

/**
 * @name useFetchTooltipMutation
 */
function useFetchTooltipMutation() {
  const key = ['fetch-tooltips'];

  return useMutation(
    key,
    async (_, { arg: { projectId, userId } }: { arg: Credentials }) => {
      return await axios
        .get(`/api/tooltip/fetch?user_id=${userId}&project_id=${projectId}`)
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

export default useFetchTooltipMutation;

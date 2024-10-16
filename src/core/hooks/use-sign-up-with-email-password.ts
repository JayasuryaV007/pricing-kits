import useSWRMutation from 'swr/mutation';
import { Users } from '~/types/users';
import axios from 'axios';

/**
 * @name useSignUpWithEmailAndPassword
 */
function useSignUpWithEmailAndPassword() {
  const key = ['auth', 'sign-up-with-email-password'];

  return useSWRMutation(key, (_, { arg: credentials }: { arg: Users }) => {
    return axios.post('/api/auth/signup', credentials) as any;
  });
}

export default useSignUpWithEmailAndPassword;

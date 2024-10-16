import useMutation from 'swr/mutation';
import axios from 'axios';
import { setCookie } from '../generic/cookies';

interface Credentials {
  email: string;
  password: string;
}

/**
 * @name useSignInWithEmailPassword
 */
function useSignInWithEmailPassword() {
  const key = ['auth', 'sign-in-with-email-password'];

  return useMutation(
    key,
    async (_, { arg: credentials }: { arg: Credentials }) => {
      return await axios
        .post('/api/auth/signin', credentials)
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
          }
          return response.data;
        })
        .catch((error) => {
          throw new Error(error.response.data.error || 'Failed to sign in');
        });
    },
  );
}

export default useSignInWithEmailPassword;

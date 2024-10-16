'use client';

import { useCallback } from 'react';

import useSignInWithEmailPassword from '~/core/hooks/use-sign-in-with-email-password';
import AuthErrorMessage from '~/app/auth/components/AuthErrorMessage';
import EmailPasswordSignInForm from '~/app/auth/components/EmailPasswordSignInForm';
import { toast } from 'react-toastify';

const EmailPasswordSignInContainer: React.FCC<{
  onSignIn: (userId?: string) => unknown;
}> = ({ onSignIn }) => {
  const signInMutation = useSignInWithEmailPassword();
  const isLoading = signInMutation.isMutating;

  const onSubmit = useCallback(
    async (credentials: { email: string; password: string }) => {
      try {
        const data = await signInMutation.trigger(credentials);
        const userId = data?.user?._id;
        toast.success('Logged In......');

        onSignIn(userId);
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [onSignIn, signInMutation],
  );

  return (
    <>
      {/* <AuthErrorMessage error={signInMutation.error} /> */}

      <EmailPasswordSignInForm onSubmit={onSubmit} loading={isLoading} />
    </>
  );
};

export default EmailPasswordSignInContainer;

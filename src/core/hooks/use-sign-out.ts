import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * @name useSignOut
 */
function useSignOut() {
  const router = useRouter();

  return useCallback(async () => {
    localStorage.removeItem('authToken');
    router.push('/auth/sign-in');
  }, []);
}

export default useSignOut;

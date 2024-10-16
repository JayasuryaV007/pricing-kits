'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      redirect('/dashboard');
    } else {
      redirect('/auth/sign-up');
    }
  }, []);

  return <></>;
}
export default Home;

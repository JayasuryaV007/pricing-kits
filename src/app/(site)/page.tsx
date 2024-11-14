'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import PricingDetailsSection from './components/PricingDetailsSection';
import PricingSection from './components/PricingSection';
import UsersNeedSection from './components/UsersNeedSection';
import CTASection from './components/CTASection';
import PricingInfoSection from './components/PricingInfoSection';
import FeatureSection from './components/FeatureSection';

function Home() {
  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     redirect('/dashboard');
  //   } else {
  //     redirect('/auth/sign-up');
  //   }
  // }, []);

  return (
    <>
      <HeroSection />
      <PricingDetailsSection />
      <FeatureSection />
      <PricingSection />
      <UsersNeedSection />
      {/* <CTASection /> */}
      <PricingInfoSection />
    </>
  );
}
export default Home;

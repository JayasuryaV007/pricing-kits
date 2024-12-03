import React from 'react';
import TermOne from './termsandconditions/TermOne';
import TermTwo from './termsandconditions/TermTwo';
import TermThree from './termsandconditions/TermThree';
import TermFour from './termsandconditions/TermFour';
import TermFive from './termsandconditions/TermFive';
import TermSix from './termsandconditions/TermSix';
import TermSeven from './termsandconditions/TermSeven';
import TermEight from './termsandconditions/TermEight';

const TermsAndConditionsSection = () => {
  return (
    <div>
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto xl:max-w-4xl">
            <p className="text-xl text-center font-bold tracking-widest text-gray-900 uppercase font-pj">
              Terms and Conditions
            </p>
            <p className="text-sm font-normal text-gray-600 mt-7 font-pj">
              Last Updated: November 21, 2024
            </p>

            <div className="mt-5 text-justify">
              <p className="text-base font-normal leading-7 text-gray-700 font-pj">
                Please read these Terms and Conditions ("Terms", "Terms and
                Conditions") carefully before using the{' '}
                <a href="#" className="ml-1 text-primary hover:underline">
                  https://www.pricingflows.com
                </a>{' '}
                website (the "Service") operated by PricingFlows ("us", "we", or
                "our").
              </p>

              <TermOne />
              <TermTwo />
              <TermThree />
              <TermFour />
              <TermFive />
              <TermSix />
              <TermSeven />
              <TermEight />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditionsSection;

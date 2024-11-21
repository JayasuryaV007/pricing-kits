import React from 'react';
import SectionOne from './policy/sectionOne';
import SectionTwo from './policy/SectionTwo';
import SectionThree from './policy/SectionThree';
import SectionFour from './policy/SectionFour';
import SectionFive from './policy/SectionFive';
import SectionSix from './policy/SectionSix';
import SectionEight from './policy/SectionEight';
import SectionSeven from './policy/SectionSeven';
import SectionNine from './policy/SectionNine';

const PolicySection = () => {
  return (
    <div>
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto xl:max-w-4xl">
            <p className="text-xl text-center font-bold tracking-widest text-gray-900 uppercase font-pj">
              Privacy Policy
            </p>
            <p className="text-sm font-normal text-gray-600 mt-7 font-pj">
              Last Updated: November 21, 2024
            </p>

            <div className="mt-5">
              <p className="text-base font-normal leading-7 text-gray-700 font-pj">
                This Privacy Policy explains how PricingFlows ("We," "Us,"
                "Our") collects, uses, discloses, and protects your personal
                data when you access or use our website
                <a href="#" className="ml-1 text-primary hover:underline">
                  https://pricing-kits.vercel.app/
                </a>{' '}
                and SaaS product, PricingFlows. By using our website or
                services, you agree to the collection and use of your
                information in accordance with this Privacy Policy.
              </p>

              <SectionOne />
              <SectionTwo />
              <SectionThree />
              <SectionFour />
              <SectionFive />
              <SectionSix />
              <SectionSeven />
              <SectionEight />
              <SectionNine />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolicySection;

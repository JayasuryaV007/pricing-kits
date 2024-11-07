import React from 'react';

function PricingSection() {
  return (
    <section className="py-12 bg-gray-900 sm:py-16 lg:py-20 xl:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Convert More Users With Crystal-Clear Pricing
          </h2>
          {/* <p className="mt-4 text-base font-normal leading-7 text-gray-400 lg:text-lg lg:mt-6 lg:leading-8">
            Clarity gives you the blocks & components you need to create a truly
            professional website, landing page or admin panel for your SaaS.
          </p> */}
          <div className="flex flex-col items-center mt-8 space-y-6 md:mt-12">
            <a
              href="#"
              title=""
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white transition-all duration-200 bg-primary border border-transparent rounded-full shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              role="button"
            >
              Start Free Trial
            </a>

            {/* <p className="text-sm font-normal text-gray-500">
              No credit card required
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;

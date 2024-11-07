import React from 'react';

function CTASection() {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center justify-center text-lg bg-gray-900 rounded-full w-9 h-9">
              🔥
            </div>
            <h2 className="ml-3 text-4xl font-bold text-gray-900 font-pj">
              Pricing
            </h2>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-base font-medium text-gray-600 font-pj">
            All our features are available to all users
          </p>

          <div className="flex items-end justify-center mt-10">
            <p className="text-lg font-bold text-gray-400 font-pj">$</p>
            <p className="text-6xl font-bold text-gray-900 font-pj">10.99</p>
            <p className="text-lg font-bold text-gray-400 font-pj">/month</p>
          </div>

          <a
            href="#"
            title=""
            className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent mt-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-90 rounded-xl"
            role="button"
          >
            Get started for $10.99 only
          </a>

          <p className="mt-4 text-sm font-normal text-gray-600 font-pj">
            30 days money back guarantee
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;

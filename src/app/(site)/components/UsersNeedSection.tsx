import React from 'react';

function UsersNeedSection() {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Why You and Your Users Need PricingFlows
          </h2>
        </div>

        <div className="grid grid-cols-1 mt-10 text-center border border-gray-200 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="relative transition-all duration-300 bg-white hover:shadow-xl hover:z-10">
            <div className="px-4 py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-primary rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-primary mt-7">
                Higher User Engagement
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Create interactive experiences by engaging users with
                informative tooltips, adding value at every hover.
              </p>
            </div>
          </div>

          <div className="relative transition-all duration-300 bg-white border-t border-gray-200 sm:border-t-0 sm:border-l hover:shadow-xl hover:z-10">
            <div className="px-4 py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-primary rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-primary mt-7">
                Increased Conversions
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Clarify features and benefits so that users can confidently
                device by choosing the best-fit plan.
              </p>
            </div>
          </div>

          <div className="relative transition-all duration-300 bg-white border-t border-gray-200 lg:border-l lg:border-t-0 hover:shadow-xl hover:z-10">
            <div className="px-4 py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 mx-auto bg-primary rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-primary mt-7">
                Flexible Design
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                Let your page adapt to evolving product features, ensuring your
                pricing page remains up-to-date.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-12 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center justify-center text-lg bg-primary rounded-full w-9 h-9">
              🔥
            </div>
            <h2 className="ml-3 text-4xl font-bold text-primary font-pj">
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
            className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-200 bg-primary border border-transparent mt-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-90 rounded-xl"
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

export default UsersNeedSection;

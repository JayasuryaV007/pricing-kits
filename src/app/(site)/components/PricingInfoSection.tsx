import Link from 'next/link';
import React from 'react';

function PricingInfoSection() {
  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-0" id="pricing">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-0">
        <div className="px-8 py-10 overflow-hidden lg:px-24 md:py-20 bg-gray-50 rounded-3xl">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Uncomplicate How Users View Your Pricing Info
            </h2>
          </div>

          <ul className="flex flex-col items-center justify-center mt-8 space-y-5 sm:mt-12 lg:mt-16 md:flex-row md:space-y-0 md:space-x-12">
            <li className="flex items-center text-primary">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-3 text-lg font-bold font-pj">
                {' '}
                Extremely cost-effective{' '}
              </span>
            </li>

            <li className="flex items-center text-primary">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-3 text-lg font-bold font-pj">
                {' '}
                7-day free trial{' '}
              </span>
            </li>

            <li className="flex items-center text-primary">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-3 text-lg font-bold font-pj">
                {' '}
                24X7X365 support{' '}
              </span>
            </li>
          </ul>

          <div className="mt-8 text-center sm:mt-12">
            <div className="relative inline-flex group">
              <div className="absolute duration-1000 rotate-180 transitiona-all opacity-70 -inset-px rounded-xl blur-lg filter group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>

              <Link
                href="/auth/sign-in"
                title=""
                className="relative inline-flex items-center justify-center py-3.5 text-base font-bold text-white transition-all duration-200 bg-primary border border-transparent px-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-90 rounded-xl"
                role="button"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingInfoSection;

import React from 'react';
import SquadWorks from './StepByStepSection';

function FeatureSection() {
  return (
    <section
      className="py-12 sm:py-16 lg:py-20 background-section"
      id="feature"
    >
      <div
        className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-4xl xl:text-5xl">
            Must-Have Features of PricingFlows
          </h2>
        </div>

        <div className="max-w-6xl mx-auto mt-12 sm:px-10">
          <SquadWorks />
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;

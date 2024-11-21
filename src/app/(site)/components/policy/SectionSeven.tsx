import React from 'react';

const SectionSeven = () => {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900 font-pj">
        7. Your Data Protection Rights
      </h2>

      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        Depending on your location, you may have certain rights regarding your
        personal data, including:
      </p>
      <ul className="pl-5 mt-4 space-y-1 text-base font-normal leading-7 text-gray-700 list-disc list-outside font-pj">
        <li>The right to access your personal data.</li>
        <li>The right to correct or update your personal data.</li>
        <li>The right to request the deletion of your personal data.</li>
        <li>
          The right to object to or restrict processing of your personal data.
        </li>
      </ul>
      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        To exercise any of these rights, please contact us at
        <a href="#" className="ml-1 text-primary hover:underline">
          info@pricingflow.com
        </a>
        .
      </p>
    </div>
  );
};

export default SectionSeven;

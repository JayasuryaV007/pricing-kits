import React from 'react';

const SectionThree = () => {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900 font-pj">
        3. How We Share Your Information
      </h2>

      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        We do not sell, rent, or trade your personal information to third
        parties. We may share your information in the following scenarios:
      </p>
      <ul className="pl-5 mt-4 space-y-1 text-base font-normal leading-7 text-gray-700 list-disc list-outside font-pj">
        <li>
          With Service Providers: Trusted third parties that assist us in
          delivering the Service, such as payment processors, hosting providers,
          and email service providers.
        </li>
        <li>
          For legal compliance: If required by law, such as to comply with a
          subpoena or other legal process.
        </li>
        <li>
          Business transfers: In the event of a merger, acquisition, or asset
          sale.
        </li>
      </ul>
    </div>
  );
};

export default SectionThree;

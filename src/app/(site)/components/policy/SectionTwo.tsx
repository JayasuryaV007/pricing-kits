import React from 'react';

const SectionTwo = () => {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900 font-pj">
        2. How We Use Your Information
      </h2>

      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        We use the information we collect for several purposes, including:
      </p>
      <ul className="pl-5 mt-4 space-y-1 text-base font-normal leading-7 text-gray-700 list-disc list-outside font-pj">
        <li>
          To provide and maintain our Service: Ensuring the functionality and
          performance of PricingFlows.
        </li>
        <li>
          To improve the Service: Analyzing usage data to enhance your
          experience.
        </li>
        <li>
          To manage your Account: Creating and managing your subscription.
        </li>
        <li>
          For customer support: Responding to your inquiries and offering
          assistance.
        </li>
        <li>
          To process payments: Handling subscription and payment information.
        </li>
        <li>
          To send promotional communications: Offering updates, new features,
          and promotional offers (only with your consent).
        </li>
      </ul>
    </div>
  );
};

export default SectionTwo;

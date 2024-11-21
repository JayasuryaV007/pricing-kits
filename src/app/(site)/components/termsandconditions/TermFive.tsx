import React from 'react';

const TermFive = () => {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900 font-pj">
        5. Limitation of Liability
      </h2>

      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        In no event shall PricingFlows, its directors, employees, partners,
        agents, suppliers, or affiliates be liable for any indirect, incidental,
        special, consequential, or punitive damages, including, but not limited
        to, loss of profits, data, goodwill, or other intangible losses,
        resulting from:
      </p>

      <ul className="pl-5 mt-4 space-y-1 text-base font-normal leading-7 text-gray-700 list-disc list-outside font-pj">
        <li>
          Your access to or use of or inability to access or use the Service
        </li>
        <li>Any conduct or content of any third party on the Service</li>
        <li>Any content obtained from the Service</li>
        <li>
          Unauthorized access, use, or alteration of your transmissions or
          content
        </li>
      </ul>

      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        This limitation applies whether based on warranty, contract, tort
        (including negligence), or any other legal theory, even if we have been
        advised of the possibility of such damages.
      </p>
    </div>
  );
};

export default TermFive;

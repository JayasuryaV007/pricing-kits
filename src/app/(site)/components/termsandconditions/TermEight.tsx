import React from 'react';

const TermEight = () => {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900 font-pj">
        8. Contact Us
      </h2>

      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        If you have any questions about these Terms, please contact us:
      </p>
      <ul className="pl-5 mt-4 space-y-1 text-base font-normal leading-7 text-gray-700 list-disc list-outside font-pj">
        <li>
          Email:
          <a href="#" className="ml-1 text-primary hover:underline">
            info@pricingflow.com
          </a>
        </li>
        <li>
          Website:
          <a href="#" className="ml-1 text-primary hover:underline">
            https://www.pricingflows.com /
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TermEight;

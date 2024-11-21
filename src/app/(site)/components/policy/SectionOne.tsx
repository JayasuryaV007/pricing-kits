import React from 'react';

const SectionOne = () => {
  return (
    <div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900 font-pj">
        1. Information We Collect
      </h2>

      <h3 className="mt-6 text-xl font-bold text-gray-900 font-pj">
        Personal Data
      </h3>
      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        When you use our Service, we collect personal data to facilitate your
        registration and use of the platform. This may include:
      </p>
      <ul className="pl-5 mt-4 space-y-1 text-base font-normal leading-7 text-gray-700 list-disc list-outside font-pj">
        <li>Name</li>
        <li>Email address</li>
        <li>Payment information (for billing purposes)</li>
        <li>Account login details (username and password)</li>
      </ul>

      <h3 className="mt-6 text-xl font-bold text-gray-900 font-pj">
        Usage Data
      </h3>
      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        We may collect information about how the Service is accessed and used.
        This includes:
      </p>
      <ul className="pl-5 mt-4 space-y-1 text-base font-normal leading-7 text-gray-700 list-disc list-outside font-pj">
        <li>
          Device information: such as IP address, browser type, and version.
        </li>
        <li>
          Usage data: Pages visited, time spent on pages, and other diagnostic
          data.
        </li>
      </ul>

      <h3 className="mt-6 text-xl font-bold text-gray-900 font-pj">
        Tracking Technologies and Cookies
      </h3>
      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        We use cookies and similar tracking technologies to monitor activity on
        our Service. These technologies include:
      </p>
      <ul className="pl-5 mt-4 space-y-1 text-base font-normal leading-7 text-gray-700 list-disc list-outside font-pj">
        <li>Cookies: Files placed on your device to track activity</li>
      </ul>
      <p className="mt-4 text-base font-normal leading-7 text-gray-700 font-pj">
        You can choose to disable cookies via your browser settings, but doing
        so may affect your ability to use some features of the Service.
      </p>
    </div>
  );
};

export default SectionOne;

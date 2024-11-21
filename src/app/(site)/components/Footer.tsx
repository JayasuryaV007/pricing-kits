'use client';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '~/core/ui/Logo';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <section className="py-10 bg-white sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-screen">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12 max-w-7xl mx-auto">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <Logo />

            <p className="text-base leading-relaxed text-gray-600 mt-7">
              Simplify pricing details with interactive features that boost
              engagement and conversions.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              <li>
                <a
                  href="#"
                  title=""
                  className="cursor-not-allowed pointer-events-none flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7 hover:bg-primary/80 focus:bg-primary/80"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title=""
                  className="cursor-not-allowed pointer-events-none flex items-center justify-center text-white transition-all duration-200 bg-primary rounded-full w-7 h-7 hover:bg-primary/80 focus:bg-primary/80"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20.45175,20.45025 L16.89225,20.45025 L16.89225,14.88075 C16.89225,13.5525 16.86975,11.844 15.04275,11.844 C13.191,11.844 12.90825,13.2915 12.90825,14.7855 L12.90825,20.45025 L9.3525,20.45025 L9.3525,8.997 L12.765,8.997 L12.765,10.563 L12.81375,10.563 C13.2885,9.66225 14.4495,8.71275 16.18125,8.71275 C19.78575,8.71275 20.45175,11.08425 20.45175,14.169 L20.45175,20.45025 Z M5.33925,7.4325 C4.1955,7.4325 3.27375,6.50775 3.27375,5.36775 C3.27375,4.2285 4.1955,3.30375 5.33925,3.30375 C6.47775,3.30375 7.4025,4.2285 7.4025,5.36775 C7.4025,6.50775 6.47775,7.4325 5.33925,7.4325 L5.33925,7.4325 Z M7.11975,20.45025 L3.5565,20.45025 L3.5565,8.997 L7.11975,8.997 L7.11975,20.45025 Z M23.00025,0 L1.0005,0 C0.44775,0 0,0.44775 0,0.99975 L0,22.9995 C0,23.55225 0.44775,24 1.0005,24 L23.00025,24 C23.55225,24 24,23.55225 24,22.9995 L24,0.99975 C24,0.44775 23.55225,0 23.00025,0 L23.00025,0 Z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <ScrollLink
                  activeClass="active"
                  smooth={true}
                  duration={2000}
                  to="home"
                  title="Home"
                  className="cursor-pointer inline-flex items-center justify-center hover:text-Black hover:-translate-y-1 text-base font-medium text-black transition-all duration-200 rounded-full  "
                >
                  Home
                </ScrollLink>
              </li>

              <li>
                <ScrollLink
                  activeClass="active"
                  smooth={true}
                  duration={2000}
                  to="feature"
                  title="Features"
                  className="cursor-pointer inline-flex items-center justify-center hover:text-Black hover:-translate-y-1 text-base font-medium text-black transition-all duration-200 rounded-full  "
                >
                  Features
                </ScrollLink>
              </li>

              <li>
                <ScrollLink
                  activeClass="active"
                  smooth={true}
                  duration={2000}
                  to="pricing"
                  title="Pricing"
                  className="cursor-pointer inline-flex items-center justify-center hover:text-Black hover:-translate-y-1 text-base font-medium text-black transition-all duration-200 rounded-full  "
                >
                  Pricing
                </ScrollLink>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="cursor-not-allowed pointer-events-none flex text-base text-black transition-all duration-200 hover:text-primary/80 focus:text-primary/80"
                >
                  {' '}
                  Blog{' '}
                </a>
              </li>

              <li>
                <Link
                  href="/auth/sign-in"
                  title=""
                  className="flex text-base text-black transition-all duration-200 hover:text-primary/80 focus:text-primary/80"
                >
                  {' '}
                  Free Trial{' '}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title=""
                  className="cursor-not-allowed pointer-events-none flex text-base text-black transition-all duration-200 hover:text-primary/80 focus:text-primary/80"
                >
                  {' '}
                  Support{' '}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="cursor-not-allowed pointer-events-none flex text-base text-black transition-all duration-200 hover:text-primary/80 focus:text-primary/80"
                >
                  {' '}
                  Terms & Conditions{' '}
                </a>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  title=""
                  className="flex text-base text-black transition-all duration-200 hover:text-primary/80 focus:text-primary/80"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Subscribe to newsletter
            </p>

            <form action="#" method="POST" className="mt-6">
              <div>
                <TextFieldLabel>
                  Email
                  <TextFieldInput
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </TextFieldLabel>
              </div>

              <button
                disabled
                className="mt-6 relative inline-flex items-center justify-center py-3.5 text-base font-bold text-white transition-all duration-200 bg-primary border border-transparent px-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-opacity-90 rounded-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" />

        <p className="text-sm text-center text-gray-600">
          © Copyright 2024, All Rights Reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;

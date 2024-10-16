'use client';
import Divider from "~/core/ui/Divider";
import {  UserIcon,
  ArrowsRightLeftIcon} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  return (
    <>
      <div className="flex gap-5 m-5">
        <div className="flex justify-center items-center">
          <div className="border rounded-lg p-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
        </div>
        {/* <div>
          <h2 className='text-base sm:text-base md:text-lg lg:text-2xl xl:text-xl 2xl:text-2xl font-bold'>Integrations and connected apps</h2>
          <span className="text-sm">Supercharge your workflow and connect the tool you use every day.</span>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;
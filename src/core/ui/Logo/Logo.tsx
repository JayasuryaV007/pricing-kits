import Link from 'next/link';
import LogoImage from './LogoImage';

const Logo: React.FCC<{
  href?: string;
  className?: string;
  label?: string;
}> = ({ href, label, className }) => {
  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'}>
      {/* <LogoImage className={className} /> */}
      <span className='font-bold text-sky-800 text-lg'>Pricing Kits</span>
    </Link>
  );
};

export default Logo;

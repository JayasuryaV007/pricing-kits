import Link from 'next/link';
import LogoImage from './LogoImage';
import Image from 'next/image';

const Logo: React.FCC<{
  href?: string;
  className?: string;
  label?: string;
}> = ({ href, label, className }) => {
  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'}>
      <Image
        src="/assets/images/logo.png"
        width={175}
        height={175}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;

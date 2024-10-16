'use client';
import Container from '~/core/ui/Container';
import Divider from '~/core/ui/Divider';

const Navbar = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <div className="border-b border-gray-200 shadow-sm dark:border-dark-900 fixed z-50 w-full bg-white dark:bg-black">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 py-4 items-center">
              {children}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;

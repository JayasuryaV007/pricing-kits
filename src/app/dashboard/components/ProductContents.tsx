import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';
import Tile from '~/core/ui/Tile';

const ProductContents = ({ products }: { products: any }) => {
  const router = useRouter();
  return (
    <>
      {products.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {products.map((product: any) => (
              <Tile>
                <div className="flex">
                  <div>
                    <div className="font-bold text-xl">{product.name}</div>
                    <div className="">{product.description}</div>
                  </div>
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVerticalIcon className="w-6 h-6" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className={'!min-w-[5rem]'}
                        collisionPadding={{ right: 20, left: 20 }}
                        sideOffset={10}
                      >
                        <DropdownMenuItem
                          role="button"
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/create-enhance?id=${product._id}`)
                          }
                        >
                          <span
                            className={
                              'flex w-full items-center space-x-2 mx-2 hover:bg-gray-50'
                            }
                          >
                            Edit
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Tile>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center font-light pt-8">
          No Enhancements added Yet - Time to Create Something New!
        </div>
      )}
    </>
  );
};

export default ProductContents;

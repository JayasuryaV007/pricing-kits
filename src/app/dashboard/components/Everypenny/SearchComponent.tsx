'use client';
import { SetStateAction, Dispatch } from 'react';
import { TextFieldInput } from '~/core/ui/TextField';

const SearchComponent: React.FC<{
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}> = ({ searchText, setSearchText }) => {
  return (
    <div className="w-1/2 pl-4 pr-2 grid grid-cols-2 gap-4">
      <div className="">
        <TextFieldInput
          placeholder="Search..."
          value={searchText}
          onChange={(e: any) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchComponent;

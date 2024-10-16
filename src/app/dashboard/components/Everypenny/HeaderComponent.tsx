'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '~/core/ui/Select';
import { Datepicker } from 'flowbite-react';
import moment from 'moment';

type DateType = {
  startDate: string;
  endDate: string;
};

const HeaderComponent: React.FC<{
  value: DateType;
  setValue: Dispatch<SetStateAction<DateType>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}> = ({ value, setValue, status, setStatus }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pt-8">
        <div className="flex items-center">
          <Datepicker
            value={value.startDate}
            placeholder="Choose Start Date..."
            onSelectedDateChanged={(date: any) =>
              setValue({
                startDate: moment(date).format('MMMM DD, YYYY'),
                endDate: '',
              })
            }
          />

          <span className="mx-4 text-gray-500">-</span>
          <Datepicker
            // className="ml-auto"
            value={value.endDate}
            placeholder="Choose End Date..."
            minDate={moment(value.startDate, 'MMMM DD, YYYY')
              .add(1, 'days')
              .toDate()}
            onSelectedDateChanged={(date: any) =>
              setValue((prev) => ({
                ...prev,
                endDate: moment(date).format('MMMM DD, YYYY'),
              }))
            }
          />
        </div>
        <div className="w-1/2">
          <Select value={status} onValueChange={(value) => setStatus(value)} >
            <SelectTrigger className="h-11">
              <SelectValue placeholder={'Select Plan Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={'All'}>All</SelectItem>
                <SelectItem value={'Active'}>Active</SelectItem>
                <SelectItem value={'Inactive'}>Inactive</SelectItem>
                <SelectItem value={'Expired'}>Expired</SelectItem>
                <SelectItem value={'Cancelled'}>Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;

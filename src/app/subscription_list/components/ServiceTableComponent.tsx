'use client'
import React,{ useState } from 'react'
import { ColumnDef } from '@tanstack/react-table';
import Tile from '~/core/ui/Tile';
import moment from 'moment';
import DataTable from '~/core/ui/DataTable';

interface DataType {
    id: string;
    user_id: string;
    service_name: string;
    service_url: string;
    plan_name: string;
    price: string | null;
    billing_cycle: string;
    next_billing_date: string;
    paid_date: string;
    start_date: string;
    created_at: string;
    status: string | null;
    type: string | null;
  }
  
const ServiceTableComponent = ({
    userSubscriptions,
  }: {
    userSubscriptions: DataType[];
  }) => {
    const columns: ColumnDef<DataType>[] = [
        { 
            header: 'Service Name',
            accessorKey: 'service_name', 
            cell: ({ row }: { row: any }) => {
                return <div>{row.original.service_name}</div>
            }
        },
        {
            header: 'Service Type',
            cell: ({ row }: { row: any }) => {
              return <div>{row.original.type || '-'}</div>;
            },
          },
          { header: 'Plan Name', accessorKey: 'plan_name' },
    {
      header: 'Plan Price',
      cell: ({ row }: { row: any }) => {
        return <div>{row.original.price || '-'}</div>;
      },
    },
    {
        header: 'Plan Status',
        cell: ({ row }: { row: any }) => {
          return (
            <>
              {row.original.status ? (
                row.original.status === 'Active' ? (
                  <Tile.Badge trend="up">{row.original.status}</Tile.Badge>
                ) : row.original.status === 'Inactive' ||
                  row.original.status === 'Expired' ? (
                  <Tile.Badge trend="down">{row.original.status}</Tile.Badge>
                ) :  row.original.status === 'Cancelled' ? (
                  <Tile.Badge trend="stale">{row.original.status}</Tile.Badge>
                ) : null
              ) : (
                <div>-</div>
              )}
            </>
          );
        },
      },
      {
        header: 'Billing Cycle',
        cell: ({ row }: { row: any }) => {
          return <div>{row.original.billing_cycle || '-'}</div>;
        },
      },
      {
        header: 'Next Billing Date',
        cell: ({ row }: { row: any }) => {
          return (
            <div>
              {moment(row.original.next_billing_date, 'DD-MM-YYYY').format(
                'MMMM DD, YYYY',
              ) || '-'}
            </div>
          );
        },
      },
      {
        header: 'Paid Date',
        cell: ({ row }: { row: any }) => {
          const paidDate = row.original.paid_date;
      
          // Check if the paid_date exists and is valid
          const formattedDate = paidDate
            ? moment(paidDate, 'DD-MM-YYYY').isValid()
              ? moment(paidDate, 'DD-MM-YYYY').format('MMMM DD, YYYY')
              : '-'
            : '-';
      
          return <div>{formattedDate}</div>;
        },
      },
    ];
    const [pageIndex, setPageIndex] = useState(0);

    const perPage = 5;
    const total = userSubscriptions.length;
    const pageCount = Math.ceil(total / perPage);
    const paginatedData = userSubscriptions?.slice(
      pageIndex * perPage,
      (pageIndex + 1) * perPage,
    );
  return (
    <div className=" mx-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <DataTable
          onPaginationChange={(pagination) => {
            setPageIndex(pagination.pageIndex);
          }}
          pageIndex={pageIndex}
          pageCount={pageCount}
          columns={columns}
          data={paginatedData}
        />
      </div>
    </div>
  )
}

export default ServiceTableComponent
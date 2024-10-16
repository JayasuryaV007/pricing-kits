'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Tile from '~/core/ui/Tile';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '~/core/ui/DataTable';
import moment from 'moment';
import ModalComponent from './ModalComponent';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import IconButton from '~/core/ui/IconButton';
import Button from '~/core/ui/Button';
import { ConvertToUSD } from '~/lib/subscriptions/convert-to-usd';

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

const TableComponent = ({
  userSubscriptions,
}: {
  userSubscriptions: DataType[];
}) => {
  const [shownModal, setShownModal] = useState(false);
  const [action, setAction] = useState('');
  const [modalData, setModalData] = useState<DataType | null>(null);

  const handleServiceClick = (serviceName: string) => {
    //router.push(serviceName);
    console.log('serviceName');
    console.log(serviceName);
    window.open(
      'subscription_list/' + serviceName,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const handleEditClick = (subscription: DataType) => {
    // Reset modal data and action before setting new state to ensure re-render
    setShownModal(false); // Close the modal first, if it is still open
    setTimeout(() => {
      // Reopen the modal after a slight delay to ensure state is updated
      setModalData(subscription);
      setAction('Edit');
      setShownModal(true);
    }, 0); // Delay to make sure state resets completely
  };

  const handleDeleteClick = (subscription: DataType) => {
    setShownModal(false);
    setTimeout(() => {
      setModalData(subscription);
      setAction('Delete');
      setShownModal(true);
    }, 0);
  };

  const handlePaidClick = (subscription: DataType) => {
    setShownModal(false);
    setTimeout(() => {
      setModalData(subscription);
      setAction('Paid');
      setShownModal(true);
    }, 0);
  };

  const handlePayClick = (subscription: DataType) => {
    if (subscription.service_url) {
      window.open(subscription.service_url, '_blank');
    } else {
      console.error('Service URL is not available');
    }
  };

  const handleCancelClick = (subscription: DataType) => {
    setShownModal(false);
    setTimeout(() => {
      setModalData(subscription);
      setAction('Cancel');
      setShownModal(true);
    }, 0);
  };
  const columns: ColumnDef<DataType>[] = [
    {
      header: 'Service Name',
      accessorKey: 'service_name',
      cell: ({ row }: { row: any }) => (
        // <Link
        //   href="#"
        //   onClick={() => handleServiceClick(row.original.service_name)}
        //   className="text-blue-600 hover:underline"
        // >
        <div>{row.original.service_name}</div>
        // </Link>
      ),
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
        return (
          <div>{'$' + ConvertToUSD(row.original.price).toFixed(2) || '-'}</div>
        );
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
              ) : row.original.status === 'Cancelled' ? (
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
              'MMM DD, YYYY',
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
            ? moment(paidDate, 'DD-MM-YYYY').format('MMM DD, YYYY')
            : '-'
          : '-';

        return <div>{formattedDate}</div>;
      },
    },
    {
      header: 'Actions',
      cell: ({ row }: { row: any }) => {
        return (
          <>
            <div className="flex justify-end w-full gap-2">
              <Button
                type="button"
                className="text-green-500"
                variant="link"
                onClick={() => handlePayClick(row.original)}
              >
                Pay Subscription
              </Button>
              <Button
                type="button"
                className="text-green-500"
                variant="link"
                onClick={() => handleCancelClick(row.original)}
              >
                Cancel Subscription
              </Button>
              {/* <ModalComponent userSubscription={row.original} action="Edit" />
              <ModalComponent userSubscription={row.original} action="Delete" /> */}
              {/* <ModalComponent userSubscription={row.original} action="Pay" />
              <ModalComponent userSubscription={row.original} action="Cancel" /> */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton>
                    <EllipsisVerticalIcon className={'h-5'} />
                  </IconButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleEditClick(row.original)}
                  >
                    Edit Subscription
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleDeleteClick(row.original)}
                  >
                    Delete Subscription
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handlePaidClick(row.original)}
                  >
                    Already Paid
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* <ModalComponent userSubscription={row.original} action="Paid" /> */}
            </div>
          </>
        );
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

  console.log('shownModal');
  console.log(total);
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
      {modalData && (
        <ModalComponent
          userSubscription={modalData}
          action={action}
          shownModal={shownModal}
        />
      )}
    </div>
  );
};

export default TableComponent;

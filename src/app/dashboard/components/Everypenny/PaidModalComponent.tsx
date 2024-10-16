import React from 'react';
import Button from '~/core/ui/Button';
import { Dispatch, SetStateAction } from 'react';
interface DataType {
  id: string;
  user_id: string;
  service_name: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  start_date: string;
  paid_date: string;
  service_url: string;
  created_at: string;
  status: string | null;
  type: string | null;
}
const axios = require('axios');

const PaidModalComponent = ({
  userSubscription,
  setIsOpen,
}: {
  userSubscription: DataType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const handlePaid = async () => {
    try {
      await axios.put('/api/paid', {
        id: userSubscription.id,
        start_date: userSubscription.start_date,
        next_billing_date: userSubscription.next_billing_date,
      });
      setIsOpen(false);
      // window.location.reload();
    } catch (error) {
      console.error('Failed to update paid date:', error);
    }
  };

  return (
    <>
      <div className="">
        <span>Have you successfully paid your next subscription? Please confirm to continue.</span>
      </div>
      <div className="flex justify-end mt-6">
        <Button variant="default" onClick={handlePaid}>
          Confirm
        </Button>
      </div>
    </>
  );
};

export default PaidModalComponent;

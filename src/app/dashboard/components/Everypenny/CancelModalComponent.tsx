import React,{ useState } from 'react'
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

const CancelModalComponent = ({
  userSubscription,
  setIsOpen
}: {
  userSubscription: DataType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => { 

  const handleCancel = async () => {
    try {
      await axios.put('/api/cancel',{"id":userSubscription.id
      });
  setIsOpen(false);
  } catch (error) {
      console.error('Failed to update cancel subscription:', error);
  }
  };
 
  return (
    <>
      <div className="">
      <span>Are you sure you want to cancel this subscription?</span>
      </div>
      <div className="flex justify-end mt-6">
      <Button variant="destructive" onClick={handleCancel}>
      Confirm
      </Button>
      </div>
    </>
  )
}




export default CancelModalComponent
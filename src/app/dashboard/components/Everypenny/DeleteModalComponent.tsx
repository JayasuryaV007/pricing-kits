import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Button from '~/core/ui/Button';
import useDeleteSubscription from '~/core/hooks/use-delete-subscription';

interface DataType {
  id: string;
  user_id: string;
  service_name: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

const DeleteModalComponent = ({
  userSubscription,
  setIsOpen,
}: {
  userSubscription: DataType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formState, setFormState] = useState(userSubscription);
  const deleteSubscriptionMutation = useDeleteSubscription();

  const onSubmit = useCallback(
    async (credentials: DataType) => {
      try {
        const data = await deleteSubscriptionMutation.trigger(credentials);
      } catch (e) {
        console.error(e);
      }
      setIsOpen(false);
    },
    [deleteSubscriptionMutation],
  );

  return (
    <>
      <div className="">
        <span>Do you want to delete this subscription?</span>
      </div>
      <div className="flex justify-end mt-6">
        <Button variant="destructive" onClick={() => onSubmit(formState)}>
          Delete
        </Button>
      </div>
    </>
  );
};
export default DeleteModalComponent;

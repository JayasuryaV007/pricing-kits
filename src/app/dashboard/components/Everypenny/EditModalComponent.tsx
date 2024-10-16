import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Button from '~/core/ui/Button';
import { TextFieldInput } from '~/core/ui/TextField';
import moment from 'moment';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/core/ui/Select';
import useEditSubscription from '~/core/hooks/use-edit-subscription';

interface DataType {
  id: string;
  user_id: string;
  service_name: string;
  service_url: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

const EditModalComponent = ({
  userSubscription,
  setIsOpen,
}: {
  userSubscription: DataType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formState, setFormState] = useState(userSubscription);
  const editSubscriptionMutation = useEditSubscription();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log('value', value);

    if (name === 'next_billing_date') {
      setFormState({
        ...formState,
        [name]: moment(value).format('DD-MM-YYYY'),
      });
      return;
    }
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSubmit = useCallback(
    async (credentials: DataType) => {
      try {
        const data = await editSubscriptionMutation.trigger(credentials);
      } catch (e) {
        console.error(e);
      }
      setIsOpen(false);
    },
    [editSubscriptionMutation],
  );

  return (
    <>
      <div className=" grid-cols-2 grid gap-4">
        {['service_name', 'plan_name', 'type', 'price'].map((field) => (
          <div key={field} className="">
            <label
              htmlFor={field}
              className="block text-sm font-medium leading-6"
            >
              {field
                .replace('_', ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </label>
            <TextFieldInput
              placeholder={`Enter ${field === 'type' ? 'service type' : field.replace('_', ' ')}`}
              className="border-0 ring-1 ring-gray-300 ring-inset focus:ring-2"
              id={field}
              name={field}
              value={formState[field as keyof DataType] ?? ''}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <div key={'next_billing_date'} className="space-y-2">
          <label
            htmlFor={'next_billing_date'}
            className="block text-sm font-medium leading-6"
          >
            Next Billing Date
          </label>
          <TextFieldInput
            type="date"
            className="border-0 ring-1 ring-gray-300 ring-inset focus:ring-2"
            id={'next_billing_date'}
            name={'next_billing_date'}
            value={
              formState.next_billing_date
                ? moment(formState.next_billing_date, 'DD-MM-YYYY').format(
                    'YYYY-MM-DD',
                  )
                : ''
            }
            onChange={handleInputChange}
          />
        </div>
        <div key={'billing_cycle'} className="space-y-2">
          <label
            htmlFor={'billing_cycle'}
            className="block text-sm font-medium leading-6"
          >
            Billing Cycle
          </label>
          <Select
            value={formState.billing_cycle || ''}
            onValueChange={(value) => {
              setFormState({
                ...formState,
                billing_cycle: value,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={'Select Plan'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={'Monthly'}>Monthly</SelectItem>
                <SelectItem value={'Quarterly'}>Quarterly</SelectItem>
                <SelectItem value={'Half-yearly'}>Half-yearly</SelectItem>
                <SelectItem value={'Yearly'}>Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div key={'status'} className="space-y-2">
          <label
            htmlFor={'status'}
            className="block text-sm font-medium leading-6"
          >
            Status
          </label>
          <Select
            value={formState.status || ''}
            onValueChange={(value) => {
              setFormState({
                ...formState,
                status: value,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={'Select Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={'Active'}>Active</SelectItem>
                <SelectItem value={'Inactive'}>Inactive</SelectItem>
                <SelectItem value={'Expired'}>Expired</SelectItem>
                <SelectItem value={'Cancelled'}>Cancelled</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button variant="default" onClick={() => onSubmit(formState)}>
          Update
        </Button>
      </div>
    </>
  );
};
export default EditModalComponent;

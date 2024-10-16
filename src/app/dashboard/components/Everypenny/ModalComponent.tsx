import AddTooltip from '~/app/create-enhance/components/AddTooltip';
import { ElementData } from '~/app/create-enhance/components/StepOne';
import Modal from '~/core/ui/Modal';

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

const ModalComponent = ({
  isOpen,
  setIsOpen,
  selectedElement,
}: {
  isOpen: boolean;
  setIsOpen: any;
  selectedElement: ElementData | null;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} heading="Add Tooltip">
        {/* <div className='font-medium text-lg'>{selectedElement?.text}</div> */}
        <AddTooltip
          selectedElement={selectedElement}
          closeModal={() => setIsOpen(false)}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;

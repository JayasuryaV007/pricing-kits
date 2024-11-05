import AddTooltip from '~/app/create-enhance/components/AddTooltip';
import { ElementData } from '~/app/create-enhance/components/Stepper';
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
  url,
  projectId,
}: {
  isOpen: boolean;
  setIsOpen: any;
  selectedElement: ElementData | null;
  url: string;
  projectId: string;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} heading="Add Tooltip">
        <AddTooltip
          url={url}
          selectedElement={selectedElement}
          closeModal={() => setIsOpen(false)}
          projectId={projectId}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;

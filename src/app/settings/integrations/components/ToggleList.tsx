'use client'
import React,{useState} from 'react'
import Button from "~/core/ui/Button";
import Modal from "~/core/ui/Modal";
import Container from "~/core/ui/Container";
import TextField from "~/core/ui/TextField";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
 
const ToggleList = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <Container>
      <div className={'flex justify-center'}>
        <Button
          size={'sm'}
          variant={'secondary'}
          onClick={() => setIsOpen(true)}
        >
          <span className={'flex space-x-2.5'}>
            <Cog8ToothIcon className={'w-4'} />
              <span>Settings</span>
            </span>
        </Button>
 
        <Modal heading={<>Settings</>} isOpen={isOpen} setIsOpen={setIsOpen}>
          <form className={'flex flex-col space-y-4'}>
            <div className={'flex flex-col space-y-4'}>
              <TextField.Label>
                Your Name
                <TextField.Input type={'email'} />
              </TextField.Label>
 
              <TextField.Label>
                Your Email
                <TextField.Input type={'email'} />
              </TextField.Label>
 
              <TextField.Label className={'flex items-center space-x-2.5'}>
                <input type={'checkbox'} className={'Toggle'} />
                <span>Receive Notifications</span>
              </TextField.Label>
            </div>
 
            <div className={'flex justify-end space-x-2'}>
              <Modal.CancelButton onClick={() => setIsOpen(false)}>
                Cancel
              </Modal.CancelButton>
 
              <Button variant={'flat'}>Save</Button>
            </div>
          </form>
        </Modal>
      </div>
    </Container>
  );
}
export default ToggleList

 

 

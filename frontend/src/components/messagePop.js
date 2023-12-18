import { Button, Modal } from 'flowbite-react';
import { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function MessagePop({isOpen,message,buttons,clearFields}) {

  const navigate=useNavigate();
  const [openModal, setOpenModal] = useState(isOpen);
  const [buttonsModal,setButtonsModal]=useState(buttons);
  const [clearFieldFunction,setClearFunction]=useState(clearFields);

  const handleClick=(button)=>{
    if(button.link==="N/A")
    {
        setOpenModal(false);
    }
    else if(button.link==="_close_")
    {
      setOpenModal(false);
      clearFields();
    }
    else navigate(button.link,{relative:"path"})
  }

  useEffect(() => {
    setOpenModal(isOpen);
    setButtonsModal(buttons);
    // console.log(buttonsModal)
  }, [isOpen,buttons]);
  return (
    <>
      <Modal 
        show={openModal} 
        size="sm" 
        onClose={() => {
          setOpenModal(false);
          clearFields();
        }}
        popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </h3>
            <div className="flex justify-center gap-4">
              {buttonsModal.map((button,index)=>(
                <Button color={button.color} onClick={()=>handleClick(button)} key={index}>
                  {button.name}
                </Button>            
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

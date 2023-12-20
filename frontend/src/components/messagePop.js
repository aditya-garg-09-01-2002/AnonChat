import { Button, Modal } from 'flowbite-react';
import { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { HiOutlineEmojiHappy,HiOutlineEmojiSad,HiOutlineExclamationCircle } from 'react-icons/hi';

export default function MessagePop({isOpen,message,buttons,clearFields,OTPPage,status}) {
  const navigate=useNavigate();
  const [openModal, setOpenModal] = useState(isOpen);
  const [buttonsModal,setButtonsModal]=useState(buttons);
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
  function icon(){
    switch(status)
    {
      case "sad" : return <HiOutlineEmojiSad className="mt-6 mx-auto mb-4 h-14 w-14 text-red-700 dark:text-red-500" />
      case "happy" : return <HiOutlineEmojiHappy className="mt-6 mx-auto mb-4 h-14 w-14 text-green-400 dark:text-green-200" />
      default : return <HiOutlineExclamationCircle className="mt-6 mx-auto mb-4 h-14 w-14 text-red-700 dark:text-red-500" />
    }
  }
  useEffect(() => {
    setOpenModal(isOpen);
    setButtonsModal(buttons);
  }, [isOpen,buttons]);
  return (
    <>
      <Modal show={openModal} size="sm" popup>
        <Modal.Body>
          <div className="text-center">
            {icon()}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </h3>
            <div className="flex flex-col items-center gap-4">
              {buttonsModal.map((button,index)=>(
                <Button className="w-full" color={button.color} onClick={()=>handleClick(button)} key={index}>
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

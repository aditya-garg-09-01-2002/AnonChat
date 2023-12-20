import React, { useEffect, useState } from "react";
import MessagePop from "./messagePop";


export default function Home(){
    const [modalProps,setShowModal]=useState({
        modalOpen:true,
        modalMessage:"Hi !!!\nYou Have Successfully Logged In\nAnd obtained authorization cookie",
        modalButtons:[
            {name:"Any Recommendations?",color:"failure",link:"_suggestions_"},
            {name:"Logout",color:"gray",link:"_logout_"}],
        modalStatus:"happy",
        })
  
    return (
    <>
        <MessagePop message={modalProps.modalMessage} isOpen={modalProps.modalOpen} buttons={modalProps.modalButtons} status={modalProps.modalStatus}/>
    </>
  );
}
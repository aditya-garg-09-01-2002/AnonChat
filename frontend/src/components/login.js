import React, { useState ,useEffect} from "react";
import {Link , useNavigate} from "react-router-dom"
import MessagePop from "./messagePop";
import { PasswordInput,EmailInput } from "./inputs";
// import Handlers from "./utils/inputHandlers";


export default function Login() {
  const navigate=useNavigate();
  const [userRole,setRole]=useState("joinee");const [userID, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [roomID,setRoomID]=useState("");
  
  
  // const {userID,userPassword,roomID,handleRoomIDChange,handleEmailChange,handlePasswordChange}=Handlers()
  
  const handleRoomIDChange=(e)=>{
      setRoomID(e.target.value)
  };
  
  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };
  
  function clearFields(){
    setEmail("");
    setPassword("");
    setRoomID("");
    setRole("joinee");
  };
  
  const [modalProps,setShowModal]=useState({modalOpen:false,modalMessage:"",modalButtons:[{name:"",color:"",link:""}],clearFields:clearFields,onOTP:false,modalStatus:""})
  
  useEffect(()=>{
    (async()=>{
      try{
        const response=await fetch(process.env.REACT_APP_BACKEND_LINK+'log',{
          method:"GET",
          credentials:"include",
          headers:{
            'Content-Type':'application/json',
          }
        })
        if(response.ok)
          navigate('/home')
      }
      catch(error)
      {
        navigate('/')
      }
    })()
  },[])
  
  const handleSubmit = async (e) => {
    
    e.preventDefault(); 

    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'log/in', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserID: userID, UserPassword: userPassword, UserRole:userRole, RoomID:roomID }),
      });
      const data = await response.json();
      
      // Handle authentication based on the server response
      if (response.ok) {
        // Successful login, handle accordingly (e.g., redirect to home page)
        navigate('/home');
      } 
      else if(response.status===404)
        setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Retry With Different Account",color:"failure",link:"_close_"},{name:"Create New User",color:"gray",link:"signup"}],modalStatus:"sad"})

      else if(response.status===401)
        setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Retry",color:"failure",link:"_close_"},{name:"Change Password",color:"gray",link:"reset"}],modalStatus:"sad"}) 
      
      else throw new Error(data.message)
        
    } 
    catch (error) {
      setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}],modalStatus:"sad"})
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          {/* image link to anonchat logo */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log In To Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <EmailInput userID={userID} registrationButton={0} handleEmailChange={handleEmailChange}/>


            <PasswordInput userPassword={userPassword} registrationButton={0} handlePasswordChange={handlePasswordChange} title={"Password"} />


            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e)=>{
                e.preventDefault()
                userRole==="joinee"?setRole("creator"):setRole("joinee")
              }}
              >
                {userRole==="joinee"?"I want to create a room":"I want to join an existing room"}
              </button>
            </div>

            {userRole==="joinee"?
            <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Room ID
              </label>
            </div>
            <div className="mt-2">
              <input
                id="roomid"
                name="roomid"
                type="text"
                autoComplete="off"
                required
                maxLength={8}
                value={roomID}
                onChange={handleRoomIDChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>:""}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Joined Yet?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>

        <MessagePop message={modalProps.modalMessage} isOpen={modalProps.modalOpen} buttons={modalProps.modalButtons} clearFields={clearFields} OTPPage={modalProps.onOTP} status={modalProps.modalStatus}/>

      </div>
    </>
  );
}

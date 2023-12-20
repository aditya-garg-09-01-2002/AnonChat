import React, { useState,useEffect } from "react";
import {Link,useNavigate} from "react-router-dom";
import MessagePop from "./messagePop";

export default function Forgot() {

  const navigate=useNavigate();
  const [userID, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userOTP, setOTP] = useState("");
  const [registrationButton,updateRegistrationStatus]=useState(0);
  const [resendOTPCount,updateCounter]=useState(30);
  
  useEffect(()=>{
    const interval=setInterval(() => {
      updateCounter(resendOTPCount => resendOTPCount - 1);
    }, 1000);
    return ()=>clearInterval(interval);
  },[resendOTPCount])

  
  function clearFields(){
    setEmail("");
    setPassword("");
    setOTP("");
  };
  
  const [modalProps,setShowModal]=useState({modalOpen:false,modalMessage:"",modalButtons:[{name:"",color:"",link:""}],clearFields:clearFields,onOTP:false,modalStatus:""})
  
  // mode 0 - code is yet not sent
  // mode 1 - code is sent successfully
  const handleEmailChange = (e) => setEmail(e.target.value);
  
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleOTPChange=(e)=> setOTP(e.target.value);
  
  const handleOTPCount=async (e)=>{
    e.preventDefault()
    updateCounter(30);
    
    try{
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'otp/send',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({UserID:userID}),
        });
        const data = await response.json();
        if (response.ok) { 
          //otp is sent, we can proceed
          updateRegistrationStatus(1)
        } else {
          // Failed login, display error message
          setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Retry",color:"failure",link:"N/A"}]})
        }
      }
      catch (error) {
        setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}]})
      }

  }
  const verify = async (e) => {
    e.preventDefault();
    if(registrationButton==0)
    {
      try
      {
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'register/checkUser',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({UserID:userID}), 
        });
        const data=await response.json();
        if(data.message==="User Does Not Exists")
        {
          setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Create New User",color:"failure",link:"/signup"},{name:"Use Different Email",color:"gray",link:"_close_"}]})
          return ;
        }
      }
      catch(error)
      {
        setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}]})
      }
      try{
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'otp/send',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({UserID:userID}),
        });
        const data = await response.json();
        if (response.ok) { 
          //otp is sent, we can proceed
          updateRegistrationStatus(1)
        } else {
          // Failed login, display error message
          setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Retry",color:"failure",link:"N/A"}],modalStatus:"sad"})
        }
      }
      catch (error) {
        setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}],modalStatus:"sad"})
      }
    }
    else{
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'otp/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserID: userID, UserOTP: userOTP}),
        });
  
        const data = await response.json();
  
        // Handle authentication based on the server response
        if (response.ok) {
            // Successful login, handle accordingly (e.g., redirect to home page)
            const response2 = await fetch(process.env.REACT_APP_BACKEND_LINK+'register/forgot', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserID: userID, UserPassword:userPassword}),
          });
          const data2 = await response2.json();
          if(response2.ok)
          {
            setShowModal({modalOpen:true,modalMessage:data2.message,modalButtons:[{name:"Move to Login",color:"failure",link:"/"}],modalStatus:"happy"})
          }
          else{
            setShowModal({modalOpen:true,modalMessage:data2.message,modalButtons:[{name:"Close",color:"failure",link:"N/A"}],modalStatus:"sad"})
          }
        } else {
          setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Try Again",color:"failure",link:"N/A"}],onOTP:true})
        }
      } catch (error) {
        setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}]})
      }
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          {/* image link to anon chat logo */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password ...
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={verify}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={userID}
                  disabled={registrationButton==0?false:true}
                  onChange={handleEmailChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {registrationButton==0?<div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  New Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={userPassword}
                  onChange={handlePasswordChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>:<div></div>}
            
            {registrationButton==1?<div>
              <div className="flex items-center justify-between">
                <label htmlFor="OTP" className="block text-sm font-medium leading-6 text-gray-900">
                  OTP
                </label>
                <div className="text-sm">
                  <div 
                    className='font-semibold text-indigo-600 hover:text-indigo-500'  
                    onClick={handleOTPCount}
                    style={
                      { 
                        pointerEvents: resendOTPCount > 0 ? 'none' : 'auto',
                        color:resendOTPCount>0?'gray':'',
                        opacity:resendOTPCount>0?'0.5':'',
                        cursor:resendOTPCount>0?'not-allowed':'pointer',
                      }
                    }
                  >
                    Resend OTP {resendOTPCount>0 && `in ${resendOTPCount}s`}
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="OTP"
                  name="OTP"
                  maxLength={6}
                  type="text"
                  pattern="[0-9]{6}"
                  autoComplete="off"
                  required
                  value={userOTP}
                  onChange={handleOTPChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>:<div></div>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {registrationButton==0 ? "Send Verification Code":"Verify The Code"}
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

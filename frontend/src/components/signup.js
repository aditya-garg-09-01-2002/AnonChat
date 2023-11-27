import React, { useState } from "react";
import {Link} from "react-router-dom";
export default function Login() {
  const [userName,setName] =useState("");
  const [userID, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userOTP, setOTP] = useState("");
  const [registrationButton,updateRegistrationStatus]=useState(0);
  // mode 0 - code is yet not sent
  // mode 1 - code is sent successfully
  const handleNameChange= (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOTPChange=(e)=>{
    setOTP(e.target.value);
  }

  const verify = async (e) => {
    e.preventDefault();
    if(registrationButton==0)
    {
      try{
        const response = await fetch('http://localhost:3000/otp/send',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({UserID:userID}),
        });
        const data = await response.json();

        console.log(data);
        console.log(response);
        if (response.ok) {
          updateRegistrationStatus(1)
          console.log('verification code is sent to your email');
        } else {
          // Failed login, display error message
          console.error('Mailing:', data.message);
        }
      }
      catch (error) {
        console.error('Error during Verification:', error.message);
      }
    }
    else{
      try {
        const response = await fetch('http://localhost:3000/otp/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ UserID: userID, UserOTP: userOTP}),
        });
  
        const data = await response.json();
  
        console.log(data);
  
        // Handle authentication based on the server response
        if (response.ok) {
            // Successful login, handle accordingly (e.g., redirect to home page)
            console.log('OTP Verified');
            const response2 = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserID: userID, UserPassword:userPassword, UserName:userName}),
          });
          const data2 = await response2.json();
          console.log(data);
          if(response2.ok)
          {
            console.log("added User");
          }
          else{
            console.error("User Registration failed: ", data2.message);
          }
        } else {
          // Failed login, display error message
          console.error('OTP Verification failed:', data.message);
        }
      } catch (error) {
        console.error('Error during OTP Verification:', error.message);
      }
      setEmail("");
      setName("");
      setPassword("");
      setOTP("");
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
            Create Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={verify}>
            {registrationButton==0?<div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  pattern="[a-z A-Z]{-50}"
                  maxLength={50}
                  required
                  value={userName}
                  onChange={handleNameChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>:<div></div>}

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
                  onChange={handleEmailChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {registrationButton==0?<div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
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
            Already Registered?{' '}
            <Link to='/' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

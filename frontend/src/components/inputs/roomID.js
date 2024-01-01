import React,{forwardRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';

const RoomID=forwardRef(({userRole,roomID,handleRoomIDChange,setRole},roomButtonRef)=>{
    return(
        <>
            <div>
                <div className="flex items-center justify-between">
                    <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    ref={roomButtonRef}
                    onClick={(e)=>{
                        e.preventDefault()
                        userRole==="joinee"?setRole("creator"):setRole("joinee")
                    }}>
                        {userRole==="creator"?"Create a Room":"Join a Room"}
                    </button>
                </div>
                {
                    userRole==="joinee"?
                        <div className="mt-6">
                            <input
                                id="roomid"
                                name="roomid"
                                type="text"
                                autoComplete="off"
                                pattern=""
                                required="[0-9]{16}"
                                maxLength={16}
                                value={roomID}
                                onChange={handleRoomIDChange}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " style={{textAlign:"center"}}
                            />
                        </div>:
                        <div className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-6" style={{textAlign:"center"}}>
                            Room with random ID will be generated
                        </div>
                }
            </div>
        </>
    )
})
export default RoomID;
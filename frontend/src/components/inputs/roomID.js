import React,{forwardRef, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';

const RoomID=forwardRef(({userRole,roomID,handleRoomIDChange,setRole},roomButtonRef)=>{
    useEffect(()=>{
        console.log(roomButtonRef)
    },[roomButtonRef])
    return(
        <>
            <div style={{display:"flex",alignItems:"center",}}>
                <div style={{textWrap:"nowrap"}}>
                    I want to
                </div>
                <button className="flex mx-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus-visible:outline-indigo-600"
                ref={roomButtonRef}
                onClick={(e)=>{
                    e.preventDefault()
                    userRole==="joinee"?setRole("creator"):setRole("joinee")
                }}>
                    {userRole==="creator"?"create":"join"}
                </button>
                <div style={{textWrap:"nowrap"}}>
                    a room
                </div>  
                <div className="mx-2">
                    <div className="">
                        <input
                            id="roomid"
                            name="roomid"
                            type="text"
                            autoComplete="off"
                            required
                            maxLength={8}
                            value={userRole==="creator"?"N/A":roomID}
                            onChange={handleRoomIDChange}
                            disabled={userRole==="creator"}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full" style={{textAlign:"center"}}>
                {userRole==="creator"?"A new room will be created with random Room ID":`You will be Joining Room ${roomID==="Enter Room ID"?"N/A":""}`}
                {userRole==="joinee"?<FontAwesomeIcon icon={faArrowTurnUp} style={{color:"black",transform:"scale(2))",paddingLeft:"3px"}}/>:""}
            </div>
        </>
    )
})
export default RoomID;
import React from "react";

export default function RoomID({userRole,roomID,handleRoomIDChange}){
    return(
        <>
            {
                userRole==="joinee"?
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
                </div>:""
            }
        </>
    )
}
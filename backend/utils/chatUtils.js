const crypto=require('crypto')

const getSize=(io,roomID)=>{
    return io.sockets.adapter.rooms.get(roomID)?.size||0;
}
const curTime=()=>{
    const date=new Date();
    const hours=(date.getHours()+5)%24;
    const minutes=(date.getMinutes()+30)%60;
    return (hours>9?hours:hours>0?"0"+hours:"00")+":"+(minutes>9?minutes:minutes>0?"0"+minutes:"00")
} 

const getRoomID=(UserRole,RoomID,UserName)=>{
    if(UserRole==="creator")
    {
        return crypto.randomBytes(8).toString('hex');
    }
    return RoomID;
}

module.exports={getSize,curTime,getRoomID}
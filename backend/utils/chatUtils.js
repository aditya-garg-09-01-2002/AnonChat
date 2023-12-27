const getSize=(io,roomID)=>{
    return io.sockets.adapter.rooms.get(roomID)?.size||0;
}
const curTime=()=>{
    const date=new Date();
    const hours=date.getHours();
    const minutes=date.getMinutes();
    return (hours>9?hours:hours>0?"0"+hours:"00")+":"+(minutes>9?minutes:minutes>0?"0"+minutes:"00")
} 

module.exports={getSize,curTime}
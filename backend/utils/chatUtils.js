const getSize=(io,roomID)=>{
    return io.sockets.adapter.rooms.get(roomID)?.size||0;
}

module.exports={getSize}
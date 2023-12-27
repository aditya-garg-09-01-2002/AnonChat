import React, { useEffect, useState, useRef } from "react";
import MessagePop from "./messagePop";
import { useNavigate } from "react-router-dom";
import {ChatMessageBox,ChatHeader,ChatContainer} from "./chat";
import ChatMainContainer from "./chat/chatMainContainer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import io from "socket.io-client"



export default function Home(){
    const socketRef=useRef(null)
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [chats,setChat]=useState([]);
    const [authorized,setAuthorized]=useState(false)
    const date=new Date();
    const time=(date).getHours()+":"+date.getMinutes(); //single digit minutes to be fixed
    const [modalProps,setShowModal]=useState({modalOpen:true,modalMessage:"Please Wait",modalButtons:[],modalStatus:"wait"})
    const [user,setUser]=useState({name:"",message:"",roomID:-1});
    const curTime=()=>{
        const date=new Date();
        const hours=date.getHours();
        const minutes=date.getMinutes();
        return (hours>9?hours:hours>0?"0"+hours:"00")+":"+(minutes>9?minutes:minutes>0?"0"+minutes:"00")
    } 
    useEffect(()=>{
        try{
            (async()=>{
                const response=await fetch(process.env.REACT_APP_BACKEND_LINK+'chat/entry',{
                    method:'GET',
                    credentials:"include",
                    headers:{
                        'content-type':'application/json',
                    },
                })
                const data=await response.json();
                if(response.ok)
                {
                    setUser({name:data.userName,message:data.message,roomID:data.roomID})
                    console.log(data)
                    setAuthorized(true);
                }
                else
                {
                    setShowModal({modalOpen:true,modalMessage:data.message,modalButtons:[{name:"Move to login",color:"failure",link:"_logout_"}],modalStatus:"sad"})
                }
            })()
        }
        catch(error)
        {
            setShowModal({modalOpen:true,modalMessage:error.message,modalButtons:[{name:"Close",color:"failure",link:"_close_"}],modalStatus:"sad"})
        }
        setLoading(false)            
    },[])
    useEffect(()=>{
        socketRef.current=io(process.env.REACT_APP_BACKEND_LINK,{withCredentials:true});
        socketRef.current.emit('join',socketRef.current.id)
        socketRef.current.on('receive-message',(received)=>
            setChat((prevChats)=>[...prevChats,{message:received.message,sent:false,time:received.time}])
        )
        return ()=>{
            socketRef.current.emit('leave',socketRef.current.id)
        }
    },[authorized])
    const handleInputMessage=(e)=>{                                                                                                                         
        const rawMessage=e;
        socketRef.current.emit('send-message',rawMessage)
        setChat((prevChats)=>[...prevChats,{message:rawMessage,sent:true,time:curTime()}])
    }
    async function logout(){
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_LINK+'log/out',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-type':'application/json',
                },
            });
            const data=await response.json();
            if (response.ok)
            {
                navigate('/',{relative:"path"})
            }                 
            else throw new Error(data.message)
        }
        catch(error)
        {
            setShowModal(prevModalProps=>({
                ...prevModalProps,
                modalMessage:error.message,
                modalStatus:"sad",
                modalButtons:[{name:"Close",link:"N/A",color:"failure"}],
            }))
        }
    }
    const [logoutHover,setLogoutHover]=useState(false)
    return (
    <>
        {
            loading?    
                <MessagePop message={modalProps.modalMessage} isOpen={modalProps.modalOpen} buttons={modalProps.modalButtons} status={modalProps.modalStatus}/>:
                authorized?
                    <div style={{
                        height:"100vh",
                        width:"100vw",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                    }}>
                        <FontAwesomeIcon 
                            icon={faSignOutAlt}
                            size="2xl"
                            style={{
                                position:"absolute",
                                top:"20px",
                                right:"20px",
                                color:"black",
                                transform:"scale(2)",
                                filter:(logoutHover?"drop-shadow(1px 1px 2px rgba(0,0,0,0.9))":""),
                            }}
                            onClick={logout}
                            onMouseEnter={()=>{setLogoutHover(true)}}
                            onMouseLeave={()=>{setLogoutHover(false)}}
                        />
                        <ChatMainContainer width="60%" height="80vh" padding="10px" borderRadius="8px" borderWidth="1px" boxShadow={{x:"10px",y:"10px", b:"10px", s:"1px",color:"black"}}>
                            <ChatHeader lineHeight="1.5" height="calc(4.5em + 10px)" padding="5px" borderRadius="8px" borderWidth="2px">
                                Hi! {user.name},<br />
                                Welcome To Anon Chat<br />
                                {user.message}
                            </ChatHeader>
                            <ChatContainer lineHeight="1.5" height='calc(80vh - 4.5em - 10px - 3em - 4px)' margin="5px 0px" chats={chats}/>
                            <ChatMessageBox getMessage={handleInputMessage} buttonPadding="0px 50px" borderRadius="8px" borderWidth="2px" marginBottom="10px" height="3em" lineHeight="1.5"/>
                        </ChatMainContainer>
                    </div>:
                    <MessagePop message={modalProps.modalMessage} isOpen={modalProps.modalOpen} buttons={modalProps.modalButtons} status={modalProps.modalStatus}/>
        }
    </>
  );
}
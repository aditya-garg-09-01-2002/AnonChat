import {React, useEffect} from "react";

export default function ChatHeader({children,lineHeight,height,padding,borderRadius,borderWidth}){
    // useEffect(()=>{console.log(message)},[])
    return(
        <>
            <div  style={{
                width:'100%',
                lineHeight:lineHeight,
                height:height,
                backgroundColor:'rgba(0,0,0,0.4)',
                textAlign:"left",
                boxSizing:"border-box",
                padding:padding,
                borderRadius:borderRadius,
                borderColor:"rgba(0,0,0,1)",
                borderWidth:borderWidth,
                color:"black",
                marginBottom:"auto",
            }}>
                {children}
            </div>
        </>
    )
}
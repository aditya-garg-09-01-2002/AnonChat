import {Children, React} from "react"

export default function ChatMainContainer({children,width,height,padding,borderRadius,borderWidth,boxShadow}){
    return (
        <>
            <div  id="mainContainer" style={{
                display:"flex",
                justifyContent:"flex-end",
                width:width,
                height:height,
                // margin:"0px auto",
                flexDirection:"column",
                padding:padding,
                alignItems:"baseline",
                border:`black solid ${borderWidth}`,
                borderRadius:borderRadius,
                boxShadow:`${boxShadow.x} ${boxShadow.y} ${boxShadow.b} ${boxShadow.s} ${boxShadow.color}`,
            }}>
                {children}
            </div>
        </>
    )
}
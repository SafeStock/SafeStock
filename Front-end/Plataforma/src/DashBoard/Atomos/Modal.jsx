import { useState } from "react";

export function Modal(){

    const [display, setDisplay] = useState('flex');

    const MudarDisplay = () => {
        setDisplay(display === 'flex' ? 'none' : 'flex');
    }

    return(
    <div onClick={MudarDisplay} className="w-full h-full items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[1000]" style={{display: display}}>
                <div className="w-[40vw] h-[80vh] bg-[white] rounded-[2vw]">
                    <button className="text-[20px] border-none bg-transparent" onClick={MudarDisplay}>x</button>
                </div>
    </div>    
)
}
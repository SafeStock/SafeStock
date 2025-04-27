import { DivisionDivElementKPIDonoLittle } from "./Divisions";

export function DivElementKPIDonoLittleLeft({ImgUrl, Titulo, Qtd}){
    return(
        <div className="w-[11.5vw] h-[20vh] rounded-[2vh] items-center flex flex-col overflow-hidden shadow-[0_5px_10px_rgba(0,0,0,0.4)]">
            <div className="w-full h-[48.5%] flex items-center justify-center">
            <div className="w-[65%] h-full flex flex-row items-end justify-around">
                    <img src={ImgUrl} className="w-[42.5%] h-[80%]"/>
                    <div className="w-[35%] h-full flex items-end justify-center text-[#9AC7D9]">
                    <h1 className="mb-[20%] text-[5vh]">{Qtd}</h1>
                </div>
                </div>
            </div>
             <DivisionDivElementKPIDonoLittle/>
            <div className="w-full h-[48.5%] flex items-center justify-center">
                <div className="w-[65%] h-full">
                    <p className="text-[1.7vh] text-center">
                    {Titulo}
                    </p>
                </div>
            </div>
        </div>
    )
}

export function DivElementKPIDonoBigLeft(){
    return(
        <div className="w-[97%] h-[48.5%] bg-[white] rounded-[2vh] 
        shadow-[0_5px_10px_rgba(0,0,0,0.4)] flex flex-row items-center justify-center">
        </div>
    )
}

export function DivElementKPIDonoLittleRight(){
    return(
        <div className="w-[97%] h-[25%] bg-[white] rounded-[2vh] mt-[2vh]
        shadow-[0_5px_10px_rgba(0,0,0,0.4)] flex flex-row items-center justify-center">
        </div>
    )
}

export function DivElementKPIDonoBigRight(){
    return(
        <div className="w-[97%] h-[70%] bg-[white] rounded-[2vh] 
        shadow-[0_5px_10px_rgba(0,0,0,0.4)] flex flex-row items-center justify-center">
        </div>
    )
}
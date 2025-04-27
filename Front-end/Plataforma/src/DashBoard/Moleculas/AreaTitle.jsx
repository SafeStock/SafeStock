import { CalendarArea } from "../Atomos/CalendarArea";

export function AreaTitle({texto, NewDisplay}) {
    return (
        <div className="flex flex-row w-full h-[15vh] text-[#3A577B] text-[4.1vh] items-center">
            <h2 className="w-[74.57vw] mt-[3vh]">{texto}</h2>
            <CalendarArea display={NewDisplay}/>
        </div>
    );
}
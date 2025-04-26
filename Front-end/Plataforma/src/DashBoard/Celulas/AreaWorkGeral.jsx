import { AreaTitle } from "../Moleculas/AreaTitle";
import { AreaWork } from "../Celulas/AreaWork";

export function AreaWorkGeral({NewText, DisplayPadrao}) {
    return(
        <div className="h-[100vh] w-full bg-transparent items-center flex flex-col">
            <AreaTitle texto={NewText} NewDisplay={DisplayPadrao}/>
            <AreaWork/>
        </div>
    )
}
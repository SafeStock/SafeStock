import { AreaTitle } from "../Moleculas/AreaTitle";
import { AreaWork } from "../Celulas/AreaWork";
import { AreaWorkDashDono } from "./AreaWorkDashDono";

export function AreaWorkGeral({
    NewText,
     DisplayPadrao,
      DisplayFlexParaFuncionarios,
      DisplayParaDashGeral
    }) {

    return(
        <div className="h-[100vh] w-full bg-transparent items-center flex flex-col">

            <AreaTitle 
            texto={NewText} 
            NewDisplay={DisplayPadrao}
            />

            <AreaWork 
            displayFuncionarios={DisplayFlexParaFuncionarios}
            />

            <AreaWorkDashDono
            displayParaDash={DisplayParaDashGeral} 
            />

            
        </div>
    )
}
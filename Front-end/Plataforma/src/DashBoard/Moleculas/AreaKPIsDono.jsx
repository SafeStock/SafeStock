import { DivElementKPIDonoLittleLeft } from "../Atomos/DivElementKPIDono"
import { DivisionDivElementKPIDono } from "../Atomos/Divisions"
import { DivElementKPIDonoBigLeft } from "../Atomos/DivElementKPIDono"
import { DivisionDivElementKPIDonoBig } from "../Atomos/Divisions"
import { DivElementKPIDonoLittleRight } from "../Atomos/DivElementKPIDono"
import { DivisionDivElementKPIDonoBigRight } from "../Atomos/Divisions"
import { DivElementKPIDonoBigRight } from "../Atomos/DivElementKPIDono"

export function AreaKPIsDonoLateralEsquerda(){

    return(
        <div className="h-[95%] w-[56%] flex flex-col justify-center items-center ml-[9vw] ">
            <div className="h-[30%] w-full flex flex-row justify-center items-center">
                <DivElementKPIDonoLittleLeft
                ImgUrl={"/src/assets/Stonks.svg"}
                Qtd="5"
                Titulo="Produtos próximo ao limite de uso"
                />
                <DivisionDivElementKPIDono/>
                <DivElementKPIDonoLittleLeft
                ImgUrl={"/src/assets/BoxKPI.svg"}
                Qtd="15"
                Titulo="Produtos presentes no estoque"
                />
                <DivisionDivElementKPIDono/>
                <DivElementKPIDonoLittleLeft
                ImgUrl={"/src/assets/GetOutBox.svg"}
                Qtd="2"
                Titulo="Produtos retirados do estoque"
                />
                <DivisionDivElementKPIDono/>
                <DivElementKPIDonoLittleLeft
                ImgUrl={"/src/assets/CalendarExpired.svg"}
                Qtd="10"
                Titulo="Produto próximo da validade"
                />
            </div>

            <div className="h-[70%] w-full flex flex-col items-center">

                <DivElementKPIDonoBigLeft 
                tamanho="35vh" 
                displayAlerta="none"
                />

                <DivisionDivElementKPIDonoBig/>

                <DivElementKPIDonoBigLeft 
                tamanho="21vh" 
                displayAlerta="flex"
                />
                
            </div>

        </div>
    )
}

export function AreaKPIsLateralDireita(){
    return(
        <div className="h-[95%] w-[38%]">
            <DivElementKPIDonoLittleRight/>
            <DivisionDivElementKPIDonoBigRight/>
            <DivElementKPIDonoBigRight/>
        </div>
    )

}
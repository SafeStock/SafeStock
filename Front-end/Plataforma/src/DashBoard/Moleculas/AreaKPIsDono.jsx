import { DivElementKPIDonoLittle } from "../Atomos/DivElementKPIDono"
import { DivisionDivElementKPIDono } from "../Atomos/Divisions"

export function AreaKPIsDonoLateralEsquerda(){

    return(
        <div className="h-[95%] w-[56%] flex flex-col justify-center items-center bg-transparent">
            <div className="h-[30%] w-full flex flex-row justify-center items-center">
                <DivElementKPIDonoLittle
                ImgUrl={"/src/assets/Stonks.svg"}
                Qtd="5"
                Titulo="Produtos próximo ao limite de uso"
                />
                <DivisionDivElementKPIDono/>
                <DivElementKPIDonoLittle
                ImgUrl={"/src/assets/BoxKPI.svg"}
                Qtd="15"
                Titulo="Produtos presentes no estoque"
                />
                <DivisionDivElementKPIDono/>
                <DivElementKPIDonoLittle
                ImgUrl={"/src/assets/GetOutBox.svg"}
                Qtd="2"
                Titulo="Produtos retirados do estoque"
                />
                <DivisionDivElementKPIDono/>
                <DivElementKPIDonoLittle
                ImgUrl={"/src/assets/CalendarExpired.svg"}
                Qtd="10"
                Titulo="Produto próximo da validade"
                />
            </div>
            <div className="h-[70%] w-full"></div>

        </div>
    )
}

export function AreaKPIsLateralDireita(){
    return(
        <div className="h-[95%] w-[38%]">

        </div>
    )

}
import { DivElementKPIDonoLittleLeft } from "../Atomos/DivElementKPIDono"
import { DivisionDivElementKPIDono } from "../Atomos/Divisions"
import { DivElementKPIDonoBigLeft } from "../Atomos/DivElementKPIDono"
import { DivisionDivElementKPIDonoBig } from "../Atomos/Divisions"
import { DivElementKPIDonoBigRight } from "../Atomos/DivElementKPIDono"
import { useEffect, useState } from "react";
import { getToken } from '../Moleculas/getToken';

export function AreaKPIsDonoLateralEsquerda() {

    const [qtd, setQtd] = useState("-");
    const token = getToken();

    useEffect(() => {
    fetch("http://localhost:8080/api/produtos/kpi/totalprodutos", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setQtd(data);
      })
      .catch(error => {
        console.error("Erro ao buscar total de produtos:", error);
      });
  }, []);

    return (
        <div className="h-[95%] w-[56%] flex flex-col justify-start items-center ml-[9vw] ">
            <div className="h-[26%] w-full flex flex-row justify-center items-start">
                <DivElementKPIDonoLittleLeft
                    ImgUrl={"/src/assets/Stonks.svg"}
                    Qtd="?"
                    Titulo="Produtos próximo ao limite de uso"
                />
                <DivisionDivElementKPIDono />
                <DivElementKPIDonoLittleLeft
                    ImgUrl={"/src/assets/BoxKPI.svg"}
                    Qtd= {qtd}
                    Titulo="Produtos presentes no estoque"
                />
                <DivisionDivElementKPIDono />
                <DivElementKPIDonoLittleLeft
                    ImgUrl={"/src/assets/GetOutBox.svg"}
                    Qtd="?"
                    Titulo="Produtos retirados do estoque"
                />
                <DivisionDivElementKPIDono />
                <DivElementKPIDonoLittleLeft
                    ImgUrl={"/src/assets/CalendarExpired.svg"}
                    Qtd="?"
                    Titulo="Produto próximo da validade"
                />
            </div>

            <div className="h-[75%] w-full flex flex-col items-center">

                <DivElementKPIDonoBigLeft
                    tamanho="37.5vh"
                    displayGrafico="flex"
                />

                <DivisionDivElementKPIDonoBig />

                <DivElementKPIDonoBigLeft
                    tamanho="21vh"
                    displayAlerta="flex"
                />

            </div>

        </div>
    )
}

export function AreaKPIsLateralDireita({ NameUse, buttonNameUse, tabela, NavigateOn }) {
    return (
        <div className="h-[95%] w-[38%]">
            <DivElementKPIDonoBigRight
                NameUse={NameUse}
                buttonNameUse={buttonNameUse}
                tabela={tabela}
                customEndpoint='http://localhost:8080/api/registroUso'
                NavigateOn= {NavigateOn}
            />
        </div>
    )

}
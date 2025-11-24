import { DivElementKPIDonoLittleLeft } from "../Atomos/DivElementKPIDono"
import { DivisionDivElementKPIDono } from "../Atomos/Divisions"
import { DivElementKPIDonoBigLeft } from "../Atomos/DivElementKPIDono"
import { DivisionDivElementKPIDonoBig } from "../Atomos/Divisions"
import { DivElementKPIDonoBigRight } from "../Atomos/DivElementKPIDono"
import { useEffect, useState } from "react";
import { CadastroUso } from "../CadastroUso"
import { getToken } from '../Moleculas/getToken';
import { API_BASE_URL } from '../../config/api';
import stonksIcon from '../../assets/Stonks.svg';
import boxIcon from '../../assets/BoxKPI.svg';
import getOutBoxIcon from '../../assets/GetOutBox.svg';
import calendarIcon from '../../assets/CalendarExpired.svg';

const endpoints = [
  `${API_BASE_URL}/produtos/kpi/totalproximoslimite`,
  `${API_BASE_URL}/produtos/kpi/totalprodutos`,
  `${API_BASE_URL}/produtos/kpi/totalretiradoestoque`,
  `${API_BASE_URL}/produtos/kpi/totalproximosvalidade`
];

const headers = {
  'Authorization': `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
};
console.log(headers);

export function AreaKPIsDonoLateralEsquerda() {
  const [qtd1, setQtd1] = useState("-");
  const [qtd2, setQtd2] = useState("-");
  const [qtd3, setQtd3] = useState("-");
  const [qtd4, setQtd4] = useState("-");

  useEffect(() => {
  const fetchKpis = async () => {
    try {
      const promises = endpoints.map(endpoint =>
        fetch(endpoint, { headers }) // <- passando headers
      );

      const responses = await Promise.all(promises);

      const data = await Promise.all(
        responses.map(async (res, idx) => {
          if (!res.ok) {
            console.warn(`Erro no endpoint ${endpoints[idx]}: status ${res.status}`);
            return { qtd: 0 };
          }

          const contentType = res.headers.get("content-type") || "";
          if (!contentType.includes("application/json")) {
            // console.warn(`Resposta do endpoint ${endpoints[idx]} não é JSON. Content-Type: ${contentType}`);
            return { qtd: 0 };
          }

          try {
            return await res.json();
          } catch (e) {
            console.warn(`Falha ao converter JSON do endpoint ${endpoints[idx]}`, e);
            return { qtd: 0 };
          }
        })
      );

      // Garantir que temos números para os estados
      setQtd1(data[0]?.qtd ?? 0);
      setQtd2(data[1]?.qtd ?? 0);
      setQtd3(data[2]?.qtd ?? 0);
      setQtd4(data[3]?.qtd ?? 0);

    } catch (error) {
      console.error("Erro geral ao buscar KPIs:", error);
      setQtd1(0);
      setQtd2(0);
      setQtd3(0);
      setQtd4(0);
    }
  };

  fetchKpis();
}, []);


  return (
    <div className="h-[95%] w-[55%] flex flex-col justify-start items-center ml-[5vw]">
      <div className="h-[25.5%] w-full flex flex-row justify-center items-start ">
        <DivElementKPIDonoLittleLeft
          ImgUrl={stonksIcon}
          Qtd={qtd1}
          Titulo="Produtos próximo ao limite de uso"
          endpoint={endpoints[0]}
        />
        <DivisionDivElementKPIDono />
        <DivElementKPIDonoLittleLeft
          ImgUrl={boxIcon}
          Qtd={qtd2}
          Titulo="Produtos presentes no estoque"
          endpoint={endpoints[1]}
        />
        <DivisionDivElementKPIDono />
        <DivElementKPIDonoLittleLeft
          ImgUrl={getOutBoxIcon}
          Qtd={qtd3}
          Titulo="Produtos retirados do estoque"
          endpoint={endpoints[2]}
        />
        <DivisionDivElementKPIDono />
        <DivElementKPIDonoLittleLeft
          ImgUrl={calendarIcon}
          Qtd={qtd4}
          Titulo="Produto próximo da validade"
          endpoint={endpoints[3]}
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

export function AreaKPIsLateralDireita({ NameUse, buttonNameUse, tabela, NavigateOn, campos }) {
  return (
    <div className="h-[95%] w-[38%]">
      <DivElementKPIDonoBigRight
        campos={campos}
        NameUse={NameUse}
        buttonNameUse={buttonNameUse}
        tabela={tabela}
        customEndpoint={`${API_BASE_URL}/registroUso`}
        NavigateOn={NavigateOn}
      />
    </div>
  )
}
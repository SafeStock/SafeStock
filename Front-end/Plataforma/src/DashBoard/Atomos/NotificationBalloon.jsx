import React from "react";
import { StatusBadge } from "../Atomos/BolinhaStatusNotification";
import "react-toastify/dist/ReactToastify.css";

export function NotificationBalloon({ campos = [], dados = [], titles = [] }) {

  // Helper para acessar campos aninhados (produto.nome etc)
  function getNestedValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }

  const dadosValidos = Array.isArray(dados) ? dados.filter((item) => item) : [];

  if (!Array.isArray(campos)) {
    return <p>Erro: estrutura da tabela inválida.</p>;
  }

  if (dadosValidos.length === 0) {
    return <p className="text-[#3A577B] mt-4">Nenhuma notificação no momento.</p>;
  }

  console.log("Dados das notificações:", dadosValidos);

  return (
    <div className="h-[86vh] w-full overflow-y-auto p-4">
      {dadosValidos.map((item, i) => {
        const linhaId = item.id ?? i;

        return (
          <div
            key={linhaId}
            className="bg-[white] w-[95%] min-h-[10vh] rounded-[10px] transition-transform duration-300 hover:-translate-y-[3px] hover:scale-103 mb-[1.7vh] mt-[1.7vh] mx-auto flex flex-col items-center p-3 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          >
            {/* Título */}
            <div className="w-[98%] h-[3vh] flex items-center border-b-[1px] border-[#3A577B]">

                {/* Exemplo: mostra o índice de "dataHora" */}
                <span className="text-[#3A577B] ml-[0.1vw] font-[500] text-[1.5vh]">
                  {getNestedValue(item, "dataHora")?.split("T")[0]}
                </span>
            </div>
            <div className="w-full h-[7vh] flex flex-row">
            {/* Status */}
            <div className="w-[2.7vw] h-full flex items-center justify-center">
              <StatusBadge status={item.status} />
            </div>

            {/* Campos */}
            <div className="w-[8.5vw] h-full text-[2.5vh] text-[#3A577B] font-[400] flex flex-wrap items-center gap-4">
              {getNestedValue(item, "nomeProduto")?.split("T")[0]}
            </div>
            <div className="w-[18.5vw] h-full text-[2.5vh] text-[#3A577B] font-[400] flex flex-wrap items-center gap-4">
              {getNestedValue(item, "descricao")?.split("T")[0]}
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

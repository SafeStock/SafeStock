import React from "react";
import { StatusBadge } from "../Atomos/BolinhaStatusNotification";
import "react-toastify/dist/ReactToastify.css";

export function NotificationBalloon({ campos = [], dados = [], titles = [] }) {
  const dateFields = ["dataNascimento", "dataEntrada", "dataValidade", "dataHora"];

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

  return (
    <div className="h-[86vh] w-full overflow-y-auto p-4">
      {dadosValidos.map((item, i) => {
        const linhaId = item.id ?? i;

        return (
          <div
            key={linhaId}
            className="w-[95%] min-h-[14vh] rounded-[10px] mb-[3vh] mt-[3vh] mx-auto flex flex-col items-center p-3 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          >
            {/* Título */}
            <div className="w-[98%] h-[3vh] flex items-center border-b-[1px] border-[#3A577B]">
              <h4 className="text-[#3A577B] font-[300] text-[1.7vh]">
                Notificação

                {/* Exemplo: mostra o índice de "dataHora" */}
                <span className="ml-[6vw] text-[#3A577B]">
                  {campos.findIndex((c) => c === "dataHora")}
                </span>
              </h4>
            </div>

            {/* Status */}
            <div className="w-full h-[5vh] flex items-center">
              <StatusBadge status={item.status} />
            </div>

            {/* Campos */}
            <div className="w-full h-[6vh] flex flex-wrap items-center gap-4">
              {campos.map((campo, j) => {
                const valor = getNestedValue(item, campo);

                return (
                  <div key={j} className="flex flex-col text-[#3A577B] font-semibold">
                    <span className="text-sm capitalize">{campo}:</span>

                    {dateFields.includes(campo) ? (
                      <span className="text-sm">{valor?.split("T")[0] ?? "—"}</span>
                    ) : (
                      <span className="text-sm">{valor ?? "—"}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React, { useState } from "react";
import { StatusBadge } from "../Atomos/BolinhaStatus";
import "react-toastify/dist/ReactToastify.css";

export function NotificationBalloon({ campos = [], dados = [] }) {
  const [idLinhaEditando, setIdLinhaEditando] = useState(null);
  const [dadosEditados, setDadosEditados] = useState({});

  function acessarPropriedade(obj, caminho) {
    if (!obj || !caminho) return undefined;
    return caminho.split(".").reduce((acc, parte) => acc && acc[parte], obj);
  }

  const handleInputChange = (e, campo) => {
    const { value } = e.target;
    setDadosEditados((prev) => ({ ...prev, [campo]: value }));
  };

  const enumOptions = {
    cargo: [
      { value: "", label: "Selecione o cargo" },
      { value: "administracao", label: "Administração" },
      { value: "limpeza", label: "Limpeza" },
    ],
    categoriaProduto: [
      { value: "", label: "Selecione a categoria" },
      { value: "chao", label: "Chão" },
      { value: "vidros", label: "Vidros" },
      { value: "multi_uso", label: "Multi Uso" },
    ],
  };

  const dateFields = ["dataNascimento", "dataEntrada", "dataValidade"];
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
      const isEditing = idLinhaEditando === linhaId;

      return (
        <div
          key={linhaId}
          className="shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[10px] mb-[3vh] w-[95%] h-[10vh] border-spacing-[2vh] mx-auto flex flex-row gap-[3px] text-[#3A577B] text-[2vh]"
        >
          {Array.isArray(campos) &&
            campos.map((campo, j) => (
              <div key={campo || j} className="flex justify-cente items-around">
                
                <div className="flex font-[900] items-center text-[2vh]">


                  {isEditing ? (
                    enumOptions[campo] ? (
                      <select
                        value={dadosEditados[campo] ?? ""}
                        onChange={(e) => handleInputChange(e, campo)}
                        className=" rounded-lg px-2 py-1"
                      >
                        {enumOptions[campo].map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : campo === "status" ? (
                      <select
                        value={dadosEditados[campo]}
                        onChange={(e) => handleInputChange(e, campo)}
                        className="border border-gray-300 rounded-lg px-2 py-1"
                      >
                        <option value="1">Ativo</option>
                        <option value="0">Inativo</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={acessarPropriedade(dadosEditados, campo) || ""}
                        onChange={(e) => handleInputChange(e, campo)}
                        className="border border-gray-300 rounded-lg px-2 py-1"
                      />
                    )
                  ) : campo === "status" ? (
                    <StatusBadge status={acessarPropriedade(item, campo)} />
                  ) : dateFields.includes(campo) ? (
                    <input
                      type="date"
                      value={dadosEditados[campo]?.split("T")[0] || ""}
                      onChange={(e) => handleInputChange(e, campo)}
                      className="border border-gray-300 rounded-lg px-2 py-1"
                    />
                  ) : (
                    <span>{acessarPropriedade(item, campo) ?? "--"}</span>
                  )}
                </div>
              </div>
            ))}
        </div>
      );
    })}
  </div>
);
}
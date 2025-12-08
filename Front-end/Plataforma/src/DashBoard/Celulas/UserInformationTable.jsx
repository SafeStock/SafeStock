import React, { useState } from "react";
import { StatusBadge } from "../Atomos/BolinhaStatus";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userIcon from '../../assets/UserIconAdded.svg';
import modifyIcon from '../../assets/ModifyUser.svg';
import removeIcon from '../../assets/RemoveUser.svg';

export function UserInformationTable({
  titles = [],
  campos = [],
  dados = [],
  tabela,
  confirmarExclusao,
  atualizarCadastro,
  mostrarIcone,
  mostrarIconesAlteracao,
}) {
  const [idLinhaEditando, setIdLinhaEditando] = useState(null);
  const [dadosEditados, setDadosEditados] = useState({});
  console.log({ titles, campos, dados });

  function acessarPropriedade(obj, caminho) {
    if (!obj || !caminho) return undefined;
    return caminho.split(".").reduce((acc, parte) => acc && acc[parte], obj);
  }

  const formatCategoria = (cat) => {
    if (!cat) return cat;
    const map = {
      vidros: "Vidros",
      chao: "Chão",
      multi_uso: "Multi Uso"
    };
    return map[cat.toLowerCase()] || cat;
  };

  const handleEditarClick = (item) => {
    setIdLinhaEditando(item.id);
    setDadosEditados(JSON.parse(JSON.stringify(item)));
  };

  const handleCancelarClick = () => {
    setIdLinhaEditando(null);
    setDadosEditados({});
  };

  const handleSalvarClick = (linhaId) => {
    if (atualizarCadastro) {
      const dadosParaAtualizar = { ...dadosEditados };

      const enums = {
        cargo: ["dono", "administracao", "limpeza"],
        categoriaProduto: ["chao", "vidros", "multi_uso"]
      };

      for (const campo in enums) {
        if (dadosParaAtualizar[campo] && !enums[campo].includes(dadosParaAtualizar[campo])) {
          toast.error(`Selecione uma opção válida no(a) ${campo}`);
          return;
        }
      }

      atualizarCadastro(linhaId, dadosParaAtualizar)
        .then(() => {
          toast.success("Funcionário atualizado com sucesso!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao atualizar funcionário.");
        });
    }

    setIdLinhaEditando(null);
    setDadosEditados({});
  };

  const handleInputChange = (e, campo) => {
    const { value } = e.target;
    setDadosEditados((prev) => ({ ...prev, [campo]: value }));
  };

  const enumOptions = {
    cargo: [
      { value: "", label: "Selecione o cargo" },
      { value: "administracao", label: "Administração" },
      { value: "limpeza", label: "Limpeza" }
    ],
    categoriaProduto: [
      { value: "", label: "Selecione a categoria" },
      { value: "chao", label: "Chão" },
      { value: "vidros", label: "Vidros" },
      { value: "multi_uso", label: "Multi Uso" }
    ]
  };

  const dateFields = ["dataNascimento", "dataEntrada", "dataValidade"];
  const dadosValidos = Array.isArray(dados) ? dados.filter(item => item) : [];


  if (!Array.isArray(titles) || !Array.isArray(campos)) {
    return <p>Erro: estrutura da tabela inválida.</p>;
  }


  return (
    <div className="relative top-[1vh]">
      <ToastContainer />

      <div className="w-full bg-[white] sticky top-0 z-50 shadow-md">
        <table className="w-full text-[#3A577B] border-collapse table-fixed">
          <colgroup>
            {mostrarIcone && <col className="w-[5vw]" />}
            {titles.map((title, idx) => (
              <col key={title || idx} className="w-auto" />
            ))}
            <col className="w-[2vw]" />
          </colgroup>
          <thead>
            <tr>
              {mostrarIcone && <th></th>}
              {titles.map((title, i) => (
                <th key={title || i} className="p-[2vh] text-center text-[2.5vh] bg-[white]">
                  {title}
                </th>
              ))}
              <th className="p-[1vh] text-center text-[2vh] bg-[white]"></th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="h-[61vh] w-[104%]">
        <table className="w-[100%] text-[#3A577B] border-separate border-spacing-[2vh] table-fixed">
          <colgroup>
            {mostrarIcone && <col className="w-[4vw]" />}
            {titles.map((title, index) => (
              <col key={title || index} className="w-full" />
            ))}
            <col className="w-[4.5vw]" />
          </colgroup>
          <tbody>
            {dadosValidos.map((item, i) => {
              const linhaId = item.id ?? i;
              const isEditing = idLinhaEditando === linhaId;

              return (
                <tr
                  key={linhaId}
                  className="h-[10vh] shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-[20px] text-[2vh]"
                >
                  {mostrarIcone && (
                    <td className="p-[2.5vh]">
                      {tabela === "produtos" ? (
                        <span className="h-[4vh] w-[3vw]" />
                      ) : (
                        <img
                          src={userIcon}
                          className="h-[4vh] w-[3vw]"
                          alt="Ícone de usuário"
                        />
                      )}
                    </td>
                  )}

                  {Array.isArray(campos) && campos.map((campo, j) => (
                    <td key={campo || j} className="text-center w-auto">
                      {isEditing ? (
                        enumOptions[campo] ? (
                          <select
                            value={dadosEditados[campo] ?? ""}
                            onChange={(e) => handleInputChange(e, campo)}
                            className="p-1 bg-white text-[#3A577B] text-[2vh] w-11/12 mx-auto"
                          >
                            {enumOptions[campo].map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : dateFields.includes(campo) ? (
                          <input
                            type="date"
                            value={dadosEditados[campo]?.split("T")[0] || ""}
                            onChange={(e) => handleInputChange(e, campo)}
                            className="p-1 bg-white text-[#3A577B] text-[2vh] w-11/12"
                          />
                        ) : campo === "status" ? (
                          <select
                            value={dadosEditados[campo]}
                            onChange={(e) => handleInputChange(e, campo)}
                            className="p-1 bg-white text-[#3A577B] text-[2vh] w-11/12 mx-auto"
                          >
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={acessarPropriedade(dadosEditados, campo) || ""}
                            onChange={(e) => handleInputChange(e, campo)}
                            className="p-1 bg-white text-[#3A577B} text-[2vh] w-11/12"
                          />
                        )
                      ) : campo === "status" ? (
                        <StatusBadge status={acessarPropriedade(item, campo)} />
                      ) : campo === "categoriaProduto" ? (  // ← ADICIONE AQUI
                        formatCategoria(acessarPropriedade(item, campo))  // ← ADICIONE AQUI
                      ) : (
                        acessarPropriedade(item, campo)
                      )}
                    </td>
                  ))}

                  {(mostrarIcone || mostrarIconesAlteracao) && (
                    <td className="w-[10vh] flex justify-center items-center gap-2 h-[10vh]">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSalvarClick(linhaId)}
                            className="border-none cursor-pointer bg-transparent"
                          >
                            ✅
                          </button>
                          <button
                            onClick={handleCancelarClick}
                            className="border-none cursor-pointer bg-transparent"
                          >
                            ❌
                          </button>
                        </>
                      ) : (
                        <>
                          {mostrarIcone && (
                            <button
                              title="Editar"
                              onClick={() => handleEditarClick(item)}
                              className="bg-transparent border-none cursor-pointer"
                              aria-label={`Editar item ${item.id}`}
                            >
                              <img
                                src={modifyIcon}
                                className="h-[2.5vh] w-[1.5vw]"
                                alt="Editar"
                              />
                            </button>
                          )}
                          {mostrarIconesAlteracao && (
                            <button
                              title="Deletar"
                              onClick={() => confirmarExclusao(item.id)}
                              className="bg-transparent border-none cursor-pointer"
                              aria-label={`Deletar item ${item.id}`}
                            >
                              <img
                                src={removeIcon}
                                className="h-[2.5vh] w-[1.5vw]"
                                alt="Deletar"
                              />
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

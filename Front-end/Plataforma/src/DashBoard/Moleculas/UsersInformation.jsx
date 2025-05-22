import { useEffect, useState } from "react";
import { UserInformationDiv } from "../Atomos/UserInformationDiv";

export function UserInformation({ abrirModal, tabela}) {
  const [dados, setDados] = useState([]);

  const buscarDados = () => {
    fetch(`http://localhost:8080/api/${tabela}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar ${tabela}`);
        }
        return response.json();
      })
      .then((data) => {
        setDados(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    buscarDados();
  }, [tabela]);

  const confirmarExclusao = (id) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir este item?`);
    if (confirmacao) {
      fetch(`http://localhost:8080/api/${tabela}/deletar/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro ao excluir`);
          }
          alert("Excluído com sucesso!");
          buscarDados();
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao excluir.");
        });
    }
  };

  // Funções auxiliares podem ser adaptadas conforme a tabela
  const capitalizar = (texto) => {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  };

  const formatarNome = (nome, sobrenome) => {
    return `${capitalizar(nome)} ${capitalizar(sobrenome)}`;
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return "Não informado";
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const formatarCargo = (cargo) => {
    switch (cargo) {
      case "dono":
        return "Dono";
      case "administracao":
        return "Adm";
      case "limpeza":
        return "Limpeza";
      default:
        return "Cargo Desconhecido";
    }
  };

  // Exemplo de renderização para funcionarios
  if (tabela === "funcionarios") {
    return (
      <div className="h-[67vh] w-[80vw] flex flex-col items-center overflow-y-auto scrollbar-custom p-[0.8vh]">
        {dados.map((funcionario, index) => (
          <UserInformationDiv
            key={index}
            id={funcionario.id}
            Nome={formatarNome(funcionario.nome, funcionario.sobrenome)}
            Cargo={formatarCargo(funcionario.cargo)}
            Email={funcionario.email}
            Telefone={formatarTelefone(funcionario.telefone)}
            confirmarExclusao={confirmarExclusao}
            abrirModal={abrirModal}
          />
        ))}
      </div>
    );
  }

  // Exemplo genérico para outras tabelas
  return (
    <div>
      {dados.map((item, idx) => (
        <div key={idx}>
          {JSON.stringify(item)}
          <button onClick={() => confirmarExclusao(item.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

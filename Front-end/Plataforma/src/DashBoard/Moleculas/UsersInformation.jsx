import { useEffect, useState } from "react";
import { UserInformationDiv } from "../Atomos/UserInformationDiv";

export function UserInformation() {
  const [funcionarios, setFuncionarios] = useState([]);

  const buscarFuncionarios = () => {
    fetch("http://localhost:8080/api/funcionarios")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar funcionários");
        }
        return response.json();
      })
      .then((data) => {
        setFuncionarios(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const confirmarExclusao = (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este funcionário?");
    if (confirmacao) {
      fetch(`http://localhost:8080/api/funcionarios/deletar/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao excluir funcionário");
          }
          alert("Funcionário excluído com sucesso!");
          buscarFuncionarios(); // 🔄 Atualiza a lista
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao excluir funcionário.");
        });
    }
  };

  const capitalizar = (texto) => {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  };

  // ✅ Função para formatar nome completo
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

  return (
    <div className="h-[60vh] w-[87vw] flex flex-col items-center overflow-y-auto scrollbar-custom p-[0.8vh]">
      {funcionarios.map((funcionario, index) => (
        <UserInformationDiv
          key={index}
          id={funcionario.id}
          Nome={formatarNome(funcionario.nome, funcionario.sobrenome)}
          Cargo={formatarCargo(funcionario.cargo)}
          Email={funcionario.email}
          Telefone={formatarTelefone(funcionario.telefone)}
          confirmarExclusao={confirmarExclusao}
        />

      ))}
    </div>
  );
}

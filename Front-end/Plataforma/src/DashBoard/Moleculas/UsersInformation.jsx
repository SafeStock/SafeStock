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

  return (
    <div className="h-[60vh] w-[72vw] flex flex-col items-center overflow-y-auto scrollbar-custom">
      {funcionarios.map((funcionario, index) => (
        <UserInformationDiv
          key={index}
          id={funcionario.id}
          Nome={`${funcionario.nome} ${funcionario.sobrenome ?? ""}`}
          Email={funcionario.email}
          confirmarExclusao={confirmarExclusao}
        />

      ))}
    </div>
  );
}

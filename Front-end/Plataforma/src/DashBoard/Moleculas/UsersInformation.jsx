import { useEffect, useState } from "react";
import { UserInformationDiv } from "../Atomos/UserInformationDiv";

export function UserInformation() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/funcionarios") // coloca aqui sua rota de listagem
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar funcionários");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFuncionarios(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="h-[60vh] w-[72vw] flex flex-col items-center overflow-y-auto scrollbar-custom">
      {funcionarios.map((funcionario, index) => (
        <UserInformationDiv
        key={index}
        Nome={`${funcionario.nome} ${funcionario.sobrenome ?? ""}`}
        Email={funcionario.email}
        />
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import React from 'react';
import { UserInformationDiv } from "../Atomos/UserInformationDiv";
import { data } from "react-router-dom";

export function UserInformation({ abrirModal, tabela, campos }) {
  const [dados, setDados] = useState([]);
  const token = sessionStorage.getItem('authToken');
  console.log(data);

  const buscarDados = () => {
    if (!token || token.trim() === "") {
      console.warn("Token inválido ou não informado");
      return;
    }

    fetch(`http://localhost:8080/api/${tabela}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Erro ao buscar ${tabela}: ${response.status} - ${text}`);

        }
        return response.text().then((text) => {
  console.log("Resposta crua da API:", text);
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Erro ao fazer parse do JSON:", e);
    throw e;
  }
});
        

      })

      .then((data) => {
        setDados(data);
        console.log(data);
        console.log(dados)
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    buscarDados();
  }, [tabela]);

  const confirmarExclusao = (id) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir este item?`);
    console.log(id);
    if (confirmacao) {
      fetch(`http://localhost:8080/api/${tabela}/deletar/${id}`, {
        method: "DELETE",
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
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

  // // Funções auxiliares podem ser adaptadas conforme a tabela
  // const capitalizar = (texto) => {
  //   if (!texto) return "";
  //   return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  // };

  // const formatarNome = (nome, sobrenome) => {
  //   return `${capitalizar(nome)} ${capitalizar(sobrenome)}`;
  // };

  // const formatarTelefone = (telefone) => {
  //   if (!telefone) return "Não informado";
  //   return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  // };

  // const formatarCargo = (cargo) => {
  //   switch (cargo) {
  //     case "dono":
  //       return "Dono";
  //     case "administracao":
  //       return "Adm";
  //     case "limpeza":
  //       return "Limpeza";
  //     default:
  //       return "Cargo Desconhecido";
  //   }
  // };

  
 
   return (
  <div className="h-[67vh] w-[80vw] flex flex-col items-center overflow-y-auto scrollbar-custom p-[0.8vh]">
    {dados.map((item, index) => (
      <UserInformationDiv
        key={index}
        id={item.id}
        valores={campos.map((campo) => item[campo])}
        abrirModal={() => abrirModal(item)}
        confirmarExclusao={confirmarExclusao}
      />
    ))}
  </div>
);

}

import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { UserInformationTable } from "../Celulas/UserInformationTable";


export function UserInformation({ abrirModal, tabela, campos, titles }) {
  const [dados, setDados] = useState([]);
  const token = sessionStorage.getItem('authToken');
  console.log(data);



  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    // Remove tudo que não for número
    const numeros = telefone.replace(/\D/g, "");
    if (numeros.length === 11) {
      // Formato (11) 99999-9999
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (numeros.length === 10) {
      // Formato (11) 9999-9999
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return telefone; // retorna como veio se não bater o padrão
  };
  function formatarDataOuDataHora(dataString) {
    if (!dataString) return "";

    const data = new Date(dataString);
    if (isNaN(data)) return dataString; // Se não for data válida, retorna original

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    const horas = data.getHours();
    const minutos = data.getMinutes();

    if (horas === 0 && minutos === 0) {
      // Só data
      return `${dia}-${mes}-${ano}`;
    } else {
      // Data com hora e minutos
      const hh = String(horas).padStart(2, "0");
      const mm = String(minutos).padStart(2, "0");
      return `${dia}-${mes}-${ano} ${hh}:${mm}`;
    }
  }


  const formatarCargo = (cargo) => {
    if (!cargo) return "";
    switch (cargo.toLowerCase()) {
      case "dono":
        return "Dono";
      case "administracao":
      case "adm":
        return "Adm";
      case "limpeza":
        return "Limpeza";
      default:
        return cargo;
    }
  };


  // Funções de formatação (telefone, datas, cargo) aqui...

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
        return response.json();
      })
      .then((data) => {
        const dadosFormatados = data.map(item => ({
          ...item,
          telefone: formatarTelefone(item.telefone),
          cargo: formatarCargo(item.cargo),
          data: formatarDataOuDataHora(item.dataHora),
          dataHoraSaida: formatarDataOuDataHora(item.dataHoraSaida),
          dataValidade: formatarDataOuDataHora(item.dataValidade)
        }));
        setDados(dadosFormatados);
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
        .catch(() => alert("Erro ao excluir."));
    }
  };

  return (
    <div className="h-[60vh] w-[95%] relative right-[3vh]  ">
      <UserInformationTable
        titles={titles}
        campos={campos}
        dados={dados}
        abrirModal={abrirModal}
        confirmarExclusao={confirmarExclusao}
        mostrarIcone={tabela === "funcionarios" || tabela === "produtos" }
        mostrarIconesAlteracao={tabela !== "historicoAlertas"}
      />
    </div>
  );
}
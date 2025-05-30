import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { UserInformationTable } from "../Celulas/UserInformationTable";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export function UserInformation({ abrirModal, tabela, campos, titles }) {
  const [dados, setDados] = useState([]);
  const token = sessionStorage.getItem('authToken');
  console.log(data);



  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    
    const numeros = telefone.replace(/\D/g, "");
    if (numeros.length === 11) {
    
      return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (numeros.length === 10) {
    
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return telefone; // retorna como veio se não bater o padrão
  };


  /**
 
 * @param {string} dataString 
 * @returns {string}
 */
function formatarDataOuDataHora(dataString) {
  if (!dataString) return "-";

  const data = dayjs(dataString);
  if (!data.isValid()) return dataString;

  
  const ehMeiaNoite = data.hour() === 0 && data.minute() === 0;

  return ehMeiaNoite
    ? data.format("DD-MM-YYYY")
    : data.format("DD-MM-YYYY HH:mm");
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

  const formatarCategoria = (categoriaProduto) => {
    if (!categoriaProduto) return "";
    switch (categoriaProduto.toLowerCase()) {
      case "vidros":
        return "Vidro";
      case "chao":
        return "Chão";
      case "muilti_uso":
        return "Multi Uso";
      default:
        return categoriaProduto;
    }
  };

  

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
  const dadosFormatados = data.map(item => {
    console.log("Item bruto:", item); // <-- aqui
    return {
      ...item,
      telefone: formatarTelefone(item.telefone),
      cargo: formatarCargo(item.cargo),
      categoriaProduto: formatarCategoria(item.categoriaProduto),
      dataHora: formatarDataOuDataHora(item.dataHora),
      dataHoraSaida: formatarDataOuDataHora(item.dataHoraSaida),
      dataValidade: formatarDataOuDataHora(item.dataValidade),
      dataEntrada: formatarDataOuDataHora(item.dataEntrada)
    };
  });
  setDados(dadosFormatados);
  console.log("Dados formatados:", dadosFormatados);
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
        mostrarIconeUser={tabela === "funcionarios"}
        mostrarIcone={tabela === "funcionarios" || tabela === "produtos"}
        mostrarIconesAlteracao={tabela !== "historicoAlertas" }
        tabela={tabela}
      />
    </div>
  
  );
}
import { useEffect, useState } from "react";
import { UserInformationTable } from "../Celulas/UserInformationTable";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import axios from 'axios';
import { exportarExcel } from "../../Hooks/exportarExcel";
import { Download } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';



export function UserInformation({ tabela, campos, titles, mostrarBotaoExportar = true }) {
  const [dados, setDados] = useState([]);
  const token = sessionStorage.getItem('authToken');


  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    return telefone.replace(/\D/g, ""); // remove tudo que não for número
  };


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

  const formatarStatus = (categoriaStatus) => {
    if (!categoriaStatus) return "";
    switch (categoriaStatus.toLowerCase()) {
      case "critico":
        return "Crítico";
      case "atenção":
        return "Atenção";
      default:
        return categoriaStatus;
    }
  };
  const buscarDados = () => {
    if (!token || token.trim() === "") {
      console.warn("Token inválido ou não informado");
      return;
    }

    axios.get(`http://localhost:8080/api/${tabela}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // 1. Processar dados da tabela principal
        const dadosBrutos = response.data;
        console.log("Dados brutos recebidos:", dadosBrutos);
        // Garante que é um array
        const lista = Array.isArray(dadosBrutos)
          ? dadosBrutos
          : Array.isArray(dadosBrutos[tabela])
            ? dadosBrutos[tabela]
            : [];

        const dadosFormatados = lista.map(item => ({
          ...item,
          telefone: formatarTelefone(item.telefone),
          cargo: formatarCargo(item.cargo),
          status: formatarStatus(item.status),
          categoriaProduto: formatarCategoria(item.categoriaProduto),
          dataHora: formatarDataOuDataHora(item.dataHora),
          dataHoraSaida: formatarDataOuDataHora(item.dataHoraSaida),
          dataValidade: formatarDataOuDataHora(item.dataValidade),
          dataEntrada: formatarDataOuDataHora(item.dataEntrada)
        }));

        setDados(dadosFormatados);
        // console.log("Dados formatados:", dadosFormatados);

        // 2. Processar alertas SEPARADAMENTE
        // Extrai alertas independentemente da estrutura
        let dadosAlertas = response.data?.data || response.data?.alertas || response.data;

        // Garante que é um array
        if (!Array.isArray(dadosAlertas)) {
          dadosAlertas = [];
        }

        // console.log("Dados recebidos:", dadosAlertas);

        // Filtra alertas válidos (com status e dataValidade)
        const alertasValidos = dadosAlertas.filter(a =>
          a &&
          a.status &&
          a.produto &&
          a.produto.dataValidade
        );

        // console.log("Alertas válidos:", alertasValidos);

        // Ordena por prioridade e data mais próxima
        const alertasOrdenados = [...alertasValidos].sort((a, b) => {
          // Prioridade: críticos primeiro
          const prioridadeA = a.status === 'critico' ? 0 : 1;
          const prioridadeB = b.status === 'critico' ? 0 : 1;

          if (prioridadeA !== prioridadeB) {
            return prioridadeA - prioridadeB;
          }

          // Mesma prioridade: ordena pela data mais próxima
          const dataA = new Date(a.produto.dataValidade);
          const dataB = new Date(b.produto.dataValidade);
          return dataA - dataB;
        });

        // console.log("Alertas ordenados:", alertasOrdenados);

        const alerta = alertasOrdenados[0] || null;
        console.log("Alerta principal selecionado:", alerta);
      })
      .catch((error) => { // Corrigido o .catch
        console.error(`Erro ao buscar ${tabela}:`, error);
      });
  }; useEffect(() => {
    buscarDados();
    // eslint-disable-next-line
  }, [tabela]);
  const confirmarExclusao = (id) => {
    Swal.fire({
      title: 'Deseja realmente excluir este Produto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn-confirm',
        cancelButton: 'btn-cancel',
        reverseButtons: true
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/${tabela}/deletar/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            Swal.fire('Excluído!', 'O item foi excluído com sucesso.', 'success');
            buscarDados(); // Atualiza a tabela sem reload
          })
          .catch(() => {
            Swal.fire('Erro', 'Não foi possível excluir o item.', 'error');
          });
      }
    });
  };


  // Atualizando cadastros de forma dinamica
  const atualizarCadastro = async (id, dadosAtualizados) => {
    if (!token || token.trim() === "") {
      alert("Token inválido ou não informado");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/api/${tabela}/atualizar/${id}`,
        dadosAtualizados,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      buscarDados(); // Atualiza a lista após editar
    } catch (error) {
      toast.error("Erro ao atualizar cadastro.");
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="relative right-[3.5vh]">
      <div className={`relative bottom-[4vh] left-[95%] ${!mostrarBotaoExportar ? 'invisible' : ''}`}>
        <button
          title="Baixar arquivo Excel"
          onClick={() => exportarExcel(dados, titles, tabela, campos)}
          className="bg-[transparent] border-none  cursor-pointer active:scale-80 transition"
        >
          <Download size={24} />
        </button>
      </div>

      <UserInformationTable
        titles={titles}
        campos={campos}
        dados={dados}
        confirmarExclusao={confirmarExclusao}
        atualizarCadastro={atualizarCadastro}
        mostrarIconeUser={tabela === "funcionarios"}
        mostrarIcone={tabela === "funcionarios" || tabela === "produtos"}
        mostrarIconesAlteracao={tabela !== "historicoAlertas"}
        tabela={tabela}
      />
    </div>
  );
}
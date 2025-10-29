import { useEffect, useState } from "react";
import { UserInformationTable } from "../Celulas/UserInformationTable";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import axios from 'axios';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

export function UserInformation({ tabela, campos, titles }) {
  const [dados, setDados] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const token = sessionStorage.getItem('authToken');
  const isPaged = tabela === "funcionarios" || tabela === "produtos" || tabela === "historicoAlertas" || tabela === "registroUso";


  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    return telefone.replace(/\D/g, ""); 
  };


  function formatarDataOuDataHora(dataString) {
    const data = dayjs(dataString);
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

    // If requesting funcionarios or produtos, ask for paged endpoint
    const url = isPaged
      ? `http://localhost:8080/api/${tabela}/paged?page=${page}&size=${size}`
      : `http://localhost:8080/api/${tabela}`;

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const responseData = response.data;
        // For paged funcionarios endpoint the payload is { content, page, size, totalPages, totalElements }
        const dadosBrutos = Array.isArray(responseData) ? responseData : (Array.isArray(responseData.content) ? responseData.content : responseData);
        console.log("Dados brutos recebidos:", dadosBrutos);
        
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

        // If paged response, update pagination state
        if (responseData && typeof responseData.page !== 'undefined') {
          setPage(Number(responseData.page));
          setSize(Number(responseData.size || size));
          setTotalPages(Number(responseData.totalPages || 0));
        }
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

        const alertasOrdenados = [...alertasValidos].sort((a, b) => {
          const prioridadeA = a.status === 'critico' ? 0 : 1;
          const prioridadeB = b.status === 'critico' ? 0 : 1;

          if (prioridadeA !== prioridadeB) {
            return prioridadeA - prioridadeB;
          }

          const dataA = new Date(a.produto.dataValidade);
          const dataB = new Date(b.produto.dataValidade);
          return dataA - dataB;
        });

        const alerta = alertasOrdenados[0] || null;
        console.log("Alerta principal selecionado:", alerta);
      })
      .catch((error) => { 
        console.error(`Erro ao buscar ${tabela}:`, error);
      });
  }; 
  
  useEffect(() => {
    // Reset pagination when switching tables so we don't remain on a stale page
    if (isPaged) {
      setPage(0);
      setTotalPages(0);
      // the page useEffect will trigger buscarDados()
    } else {
      buscarDados();
    }
    // eslint-disable-next-line
  }, [tabela]);

  // refetch when page changes for funcionarios
  useEffect(() => {
    if (isPaged) buscarDados();
    // eslint-disable-next-line
  }, [page]);
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
            buscarDados(); 
          })
          .catch(() => {
            Swal.fire('Erro', 'Não foi possível excluir o item.', 'error');
          });
      }
    });
  };


  
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
      buscarDados(); 
    } catch (error) {
      
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="relative right-[3.5vh]">
      {isPaged && (
        <div className="flex gap-2 mb-2 items-center justify-end absolute top-[75vh] right-[-4vh]">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page <= 0}
            className="flex items-center justify-center"
            style={{ background: 'transparent', border: 'none', padding: '0.25rem', appearance: 'none', WebkitAppearance: 'none', outline: 'none' }}
            aria-label="Página anterior"
            title="Anterior"
          >
            <FiChevronLeft
              size={55}
              color="#3A577B"
              style={{ lineHeight: 1, opacity: page <= 0 ? 0.3 : 1 }}
              aria-hidden="true"
            />
          </button>

          <span className="text-xl font-bold text-black mx-2">{page + 1}/{totalPages || 1}</span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={totalPages === 0 || page >= totalPages - 1}
            aria-label="Próxima página"
            title="Próxima"
            className="flex items-center justify-center"
            style={{ background: 'transparent', border: 'none', padding: '0.25rem', appearance: 'none', WebkitAppearance: 'none', outline: 'none' }}
          >
            <FiChevronRight
              size={55}
              color="#3A577B"
              style={{ lineHeight: 1, opacity: (totalPages === 0 || page >= totalPages - 1) ? 0.3 : 1 }}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
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
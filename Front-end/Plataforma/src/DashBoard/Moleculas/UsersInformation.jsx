import { useEffect, useState } from "react";
import { UserInformationTable } from "../Celulas/UserInformationTable";
import axios from 'axios';
import Swal from 'sweetalert2';

export function UserInformation({ tabela, campos, titles }) {
  const [dados, setDados] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Página atual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas
  const [itemsPerPage, setItemsPerPage] = useState(4); // Itens por página
  const token = sessionStorage.getItem('authToken');

  const buscarDados = () => {
    if (!token || token.trim() === "") {
      console.warn("Token inválido ou não informado");
      return;
    }

    const endpoint = tabela === "funcionarios"
      ? `http://localhost:8080/api/funcionarios?page=${currentPage}&size=${itemsPerPage}`
      : tabela === "produtos"
        ? `http://localhost:8080/api/produtos?page=${currentPage}&size=${itemsPerPage}`
        : ''; // Adicione outros endpoints conforme necessário

    if (!endpoint) {
      console.warn("Tabela não suportada");
      return;
    }

    axios.get(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        const dadosPaginados = response.data;
        if (dadosPaginados.content) {
          setDados(dadosPaginados.content); // Acessa a lista de dados
          setTotalPages(dadosPaginados.totalPages); // Atualiza o total de páginas
        } else {
          setDados([]); // Se não houver conteúdo, define como vazio
          setTotalPages(0); // Define total de páginas como 0
        }
      })
      .catch((error) => {
        console.error(`Erro ao buscar dados:`, error);
      });
  };

  useEffect(() => {
    buscarDados();
    // eslint-disable-next-line
  }, [currentPage, itemsPerPage]); // Adicione currentPage e itemsPerPage como dependências

  const confirmarExclusao = (id) => {
    Swal.fire({
      title: `Deseja realmente excluir este ${tabela === "funcionarios" ? "funcionário" : "produto"}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const endpoint = tabela === "funcionarios" 
          ? `http://localhost:8080/api/funcionarios/deletar/${id}`
          : tabela === "produtos"
            ? `http://localhost:8080/api/produtos/deletar/${id}`
            : ''; // Adicione outros endpoints conforme necessário

        if (!endpoint) {
          console.warn("Tabela não suportada para exclusão");
          return;
        }

        axios.delete(endpoint, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            Swal.fire('Excluído!', `O ${tabela === "funcionarios" ? "funcionário" : "produto"} foi excluído com sucesso.`, 'success');
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

    const endpoint = tabela === "funcionarios" 
      ? `http://localhost:8080/api/funcionarios/atualizar/${id}`
      : tabela === "produtos"
        ? `http://localhost:8080/api/produtos/atualizar/${id}`
        : ''; // Adicione outros endpoints conforme necessário

    if (!endpoint) {
      console.warn("Tabela não suportada para atualização");
      return;
    }

    try {
      await axios.put(endpoint, dadosAtualizados, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      buscarDados(); 
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  const handleItemsPerPageChange = (newSize) => {
    setItemsPerPage(newSize);
    setCurrentPage(0); // Volta para a primeira página ao mudar o tamanho
  };

  return (
    <div className="relative right-[3.5vh]">
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
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
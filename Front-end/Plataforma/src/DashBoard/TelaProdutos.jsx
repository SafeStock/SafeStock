import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState, useEffect } from "react";
import { Modal } from "./Atomos/Modal";
import { CadastroProduto } from "./CadastroProduto";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export function TelaProdutos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [dadosPrimeiraEtapa, setDadosPrimeiraEtapa] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // const abrirModalCadastro = () => {
  //   setModoCadastro(true);
  //   setProdutoSelecionado({});
  //   setDadosPrimeiraEtapa({});
  //   setEtapa(1);
  //   setModalAberto(true);
  // };

  const fecharModal = () => {
    setModalAberto(false);
    setEtapa(1);
    setDadosPrimeiraEtapa({});
    setProdutoSelecionado({});
    setModoCadastro(false);
  };

  const abrirModal = (produto = {}) => {
    setProdutoSelecionado(produto);
    setDadosPrimeiraEtapa({
      nome: produto.nome || "",
      categoria: produto.categoriaProduto || "",
      quantidade: produto.quantidade || "",
      id: produto.id
    });
    setEtapa(1);
    setModoCadastro(false);
    setModalAberto(true);
  };

  const atualizarProduto = async (id, dadosAtualizados) => {
    if (!token || token.trim() === "") {
      toast.error("Token inválido ou não informado");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/api/produtos/atualizar/${id}`,
        dadosAtualizados,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Produto atualizado com sucesso!");
      fecharModal();
      window.location.reload();
      console.clear();
    } catch (error) {
      toast.error("Erro ao atualizar produto.");
      console.error(error.response?.data || error);
    }
  };

  const cadastrarProduto = async (dadosAtualizados) => {
    if (!token || token.trim() === "") {
      toast.error("Token inválido ou não informado");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/produtos/cadastro`,
        dadosAtualizados,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Produto cadastrado com sucesso!");
      fecharModal();
      window.location.reload();
      console.clear();
    } catch (error) {
      toast.error("Erro ao cadastrar produto.");
      console.error(error.response?.data || error);
    }
  };

  const handlePrimeiraEtapa = (dados) => {
    setDadosPrimeiraEtapa(prev => ({ ...prev, ...dados }));
    setEtapa(2);
    return false;
  };

  const handleSegundaEtapa = async (dados) => {
    const dadosAtualizados = {
      nome: dadosPrimeiraEtapa.nome,
      categoriaProduto: dadosPrimeiraEtapa.categoria,
      quantidade: Number(dadosPrimeiraEtapa.quantidade),
      limiteSemanalDeUso: Number(dados.limiteSemanalDeUso),
      dataValidade: dados.dataValidade,
      dataEntrada: dados.dataEntrada,
    };
    if (modoCadastro) {
      await cadastrarProduto(dadosAtualizados);
    } else {
      const produtoId = dadosPrimeiraEtapa.id;
      await atualizarProduto(produtoId, { id: produtoId, ...dadosAtualizados });
    }
    return false;
  };

  const cargo = sessionStorage.getItem('cargo');
  let display = cargo === 'limpeza' ? 'flex' : 'none';

  
  if (loading) {
    return (
      <div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
        <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
          <div className="flex items-center fixed top-[4vh] left-[8.5vw]">
            <Skeleton borderRadius={6} width={220} height={75} />
          </div>

          <div className="flex items-center fixed top-[6vh] right-[6vw]">
            <Skeleton circle width={50} height={50} />
          </div>

          <div className="fixed top-[15.5vh] left-[14vw] flex gap-[7vh]">
            <Skeleton borderRadius={6} width={135} height={65} />
            <Skeleton borderRadius={6} width={135} height={65} />
            <Skeleton borderRadius={6} width={135} height={65} />
            <Skeleton borderRadius={6} width={135} height={65} />
            <Skeleton borderRadius={6} width={175} height={65} />
            <Skeleton borderRadius={6} width={175} height={65} />
          </div>

          <div className="fixed flex flex-col top-[26vh] right-[1.3vw] gap-[1.2vh]">
            <Skeleton borderRadius={10} width={1410} height={90} />
            <Skeleton borderRadius={10} width={1410} height={90} />
            <Skeleton borderRadius={10} width={1410} height={90} />
            <Skeleton borderRadius={10} width={1410} height={90} />
            <Skeleton borderRadius={10} width={1410} height={90} />
          </div>

          <div className="flex items-center fixed bottom-[5vh] right-[44vw]">
            <Skeleton circle width={65} height={65} />
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="flex flex-col w-full overflow-x-hidden opacity-0 animate-fadeInContent" style={{ animationDelay: '0.2s' }}>
  

      <Modal isOpen={modalAberto} onClose={fecharModal}>
        {etapa === 1 ? (
          <CadastroProduto
            titulo={modoCadastro ? "Cadastrar Produto" : "Editar Produtos"}
            campos={[
              { name: "nome", label: "Nome:", placeholder: "Digite o nome do produto" },
              { name: "categoria", label: "Categoria:", placeholder: "Digite a categoria do produto" },
              { name: "quantidade", label: "Quantidade:", placeholder: "Digite a quantidade de produtos" },
            ]}
            onSubmit={handlePrimeiraEtapa}
            buttonLabel="Próximo"
            initialValues={produtoSelecionado}
          />
        ) : (
          <CadastroProduto
            titulo={modoCadastro ? "Cadastrar Produto" : "Editar Produtos"}
            campos={[
              { name: "limiteSemanalDeUso", label: "Limite de uso:", placeholder: "Digite o limite de uso semanal" },
              { name: "dataValidade", label: "Data de validade:", placeholder: "Digite a data de validade" },
              { name: "dataEntrada", label: "Data de entrada:", placeholder: "Digite a data de entrada" },
            ]}
            onSubmit={handleSegundaEtapa}
            buttonLabel={modoCadastro ? "Cadastrar" : "Enviar"}
            initialValues={produtoSelecionado}
          />
        )}
      </Modal>

      <AreaWorkGeral
        NewText="Produtos"
        titles={["Nome", "Categoria", "Quantidade", "Limite", "Data de Validade", "Data de Entrada"]}
        tabela="produtos"
        campos={["nome", "categoriaProduto", "quantidade", "limiteSemanalDeUso", "dataValidade", "dataEntrada"]}
        abrirModal={abrirModal}
        displayButton={display}
        mostrarBotaoExportar={true}
      />
    </div>
  );
}

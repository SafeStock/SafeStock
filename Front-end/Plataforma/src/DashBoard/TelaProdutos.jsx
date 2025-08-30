import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState } from "react";
import { Modal } from "./Atomos/Modal";
import { CadastroProduto } from "./CadastroProduto";
import axios from "axios";


export function TelaProdutos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [dadosPrimeiraEtapa, setDadosPrimeiraEtapa] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false); // novo estado
  const token = sessionStorage.getItem('authToken');
  

  // Função para abrir o modal para cadastrar
  const abrirModalCadastro = () => {
    setModoCadastro(true);
    setProdutoSelecionado({});
    setDadosPrimeiraEtapa({});
    setEtapa(1);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEtapa(1);
    setDadosPrimeiraEtapa({});
    setProdutoSelecionado({});
    setModoCadastro(false);
  };

  // Função para abrir o modal para editar
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

  // Função para atualizar o produto no backend
  const atualizarProduto = async (id, dadosAtualizados) => {
    if (!token || token.trim() === "") {
      alert("Token inválido ou não informado");
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
      alert("Produto atualizado com sucesso!");
      fecharModal();
      window.location.reload();
    } catch (error) {
      alert("Erro ao atualizar produto.");
      console.error(error.response?.data || error);
    }
  };

  // Função para cadastrar produto no backend
  const cadastrarProduto = async (dadosAtualizados) => {
    if (!token || token.trim() === "") {
      alert("Token inválido ou não informado");
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
      alert("Produto cadastrado com sucesso!");
      fecharModal();
      window.location.reload();
    } catch (error) {
      alert("Erro ao cadastrar produto.");
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
  let display = 'none';
  if (cargo === 'limpeza') {
    display = 'flex';
  }

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
  
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
              { name: "dataValidade", label: "Data de validade:", placeholder: "Digite a data de validade (ex: 2025-08-27)" },
              { name: "dataEntrada", label: "Data de entrada:", placeholder: "Digite a data de entrada (ex: 2025-08-27)" },
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
        atualizarCadastro={atualizarProduto}
        displayButton={display}
        mostrarBotaoExportar={false}
      />
        {/* Botão de adicionar produto (estilo igual ao de funcionários) */}
      <div className="w-[8vw] items-center justify-center flex fixed bottom-[9vh] right-[42vw]">
        <button
          title="Cadastrar Produto"
          onClick={abrirModalCadastro}
          className="border-0 bg-[#3A577B] text-[26px] text-[#eee] font-[600] rounded-[50%] w-[6vh] h-[6vh] cursor-pointer hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200 "
        >
          +
        </button>
      </div>
    </div>
  );
}
import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState } from "react";
import { Modal } from "./Atomos/Modal";
import { Formulario } from "./Formulario";
import axios from "axios";

export function TelaProdutos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [dadosPrimeiraEtapa, setDadosPrimeiraEtapa] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const token = sessionStorage.getItem('authToken');

  const fecharModal = () => {
    setModalAberto(false);
    setEtapa(1);
    setDadosPrimeiraEtapa({});
    setProdutoSelecionado({});
  };

  // Função para abrir o modal já com os dados do produto selecionado
  const abrirModal = (produto = {}) => {
    setProdutoSelecionado(produto);
    setDadosPrimeiraEtapa({
      nome: produto.nome || "",
      categoria: produto.categoriaProduto || "",
      quantidade: produto.quantidade || "",
      id: produto.id
    });
    setEtapa(1);
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
      // Aqui você pode buscar novamente os dados se quiser atualizar a lista
    } catch (error) {
      alert("Erro ao atualizar produto.");
      console.error(error.response?.data || error);
    }
  };

  const handlePrimeiraEtapa = (dados) => {
    setDadosPrimeiraEtapa(prev => ({ ...prev, ...dados }));
    setEtapa(2);
    return false;
  };

  const handleSegundaEtapa = async (dados) => {
    const produtoId = dadosPrimeiraEtapa.id;
    // Certifique-se de que todos os campos obrigatórios estão presentes e corretos
    const dadosAtualizados = {
      id: produtoId,
      nome: dadosPrimeiraEtapa.nome,
      categoriaProduto: dadosPrimeiraEtapa.categoria,
      quantidade: Number(dadosPrimeiraEtapa.quantidade),
      limiteSemanalDeUso: Number(dados.limiteSemanalDeUso),
      dataValidade: dados.dataValidade,
      dataEntrada: dados.dataEntrada,
    };
    console.log("Enviando para o backend:", dadosAtualizados);
    await atualizarProduto(produtoId, dadosAtualizados);
    window.location.reload(); // Atualiza a página após editar
    return false;
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Modal isOpen={modalAberto} onClose={fecharModal}>
        {etapa === 1 ? (
          <Formulario
            titulo="Editar Produtos"
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
          <Formulario
            titulo="Editar Produtos"
            campos={[
              { name: "limiteSemanalDeUso", label: "Limite de uso:", placeholder: "Digite o limite de uso semanal" },
              { name: "dataValidade", label: "Data de validade:", placeholder: "Digite a data de validade (ex: 2025-08-27)" },
              { name: "dataEntrada", label: "Data de entrada:", placeholder: "Digite a data de entrada (ex: 2025-08-27)" },
            ]}
            onSubmit={handleSegundaEtapa}
            buttonLabel="Enviar"
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
      />
    </div>
  );
}
import React from "react";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState } from "react";
import { Modal } from "./Atomos/Modal";
import { Cadastro } from "./Cadastro";
import axios from "axios";

export function TelaFuncionarios() {
  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [dadosPrimeiraEtapa, setDadosPrimeiraEtapa] = useState({});
  const [dadosSelecionados, setDadosSelecionados] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false);
  const token = sessionStorage.getItem('authToken');

  // Atualizar funcionário existente
  const atualizarCadastro = async (id, dadosAtualizados) => {
    if (!token || token.trim() === "") {
      alert("Token inválido ou não informado");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/api/funcionarios/atualizar/${id}`,
        dadosAtualizados,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert("Cadastro atualizado com sucesso!");
      window.location.reload();
    } catch (error) {
      alert("Erro ao atualizar cadastro.");
      console.error(error.response?.data || error);
    }
  };

  // Cadastrar novo funcionário
  const cadastrarFuncionario = async (dados) => {
    if (!token || token.trim() === "") {
      alert("Token inválido ou não informado");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/funcionarios/cadastro`,
        dados,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert("Funcionário cadastrado com sucesso!");
      window.location.reload();
    } catch (error) {
      alert("Erro ao cadastrar funcionário.");
      console.error(error.response?.data || error);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEtapa(1);
    setDadosPrimeiraEtapa({});
    setDadosSelecionados({});
    setModoCadastro(false);
  };

  // Abrir modal para editar funcionário
  const abrirModal = (funcionario = {}) => {
    setModoCadastro(false);
    setDadosSelecionados(funcionario);
    setDadosPrimeiraEtapa({
      nome: funcionario.nome || "",
      sobrenome: funcionario.sobrenome || "",
      cargo: funcionario.cargo || "",
      id: funcionario.id
    });
    setEtapa(1);
    setModalAberto(true);
  };

  // Abrir modal para novo cadastro (usado pelo botão "+")
  const abrirModalCadastro = () => {
    setModoCadastro(true);
    setDadosSelecionados({});
    setDadosPrimeiraEtapa({});
    setEtapa(1);
    setModalAberto(true);
  };

  const handlePrimeiraEtapa = (dados) => {
    setDadosPrimeiraEtapa(prev => ({ ...prev, ...dados }));
    setEtapa(2);
    return false;
  };

  const handleSegundaEtapa = async (dados) => {
    const dadosAtualizados = {
      ...dadosPrimeiraEtapa,
      ...dados,
    };
    try {
      if (modoCadastro) {
        await cadastrarFuncionario(dadosAtualizados);
      } else {
        const funcionarioId = dadosPrimeiraEtapa.id;
        await atualizarCadastro(funcionarioId, dadosAtualizados);
      }
      fecharModal();
    } catch (error) {
      alert("Ocorreu um erro ao salvar o funcionário");
      console.error(error);
    }
    return false;
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden p-4">
      {/* Modal de cadastro/edição */}
      <Modal isOpen={modalAberto} onClose={fecharModal}>
        {etapa === 1 ? (
          <Cadastro
            titulo={modoCadastro ? "Cadastrar Funcionário" : "Editar Funcionário"}
            campos={[
              { name: "nome", label: "Nome:", placeholder: "Digite o nome do funcionário" },
              { name: "sobrenome", label: "Sobrenome:", placeholder: "Digite o sobrenome do funcionário" },
              { name: "cargo", label: "Cargo:", placeholder: "Digite o cargo do funcionário" },
            ]}
            onSubmit={handlePrimeiraEtapa}
            buttonLabel="Próximo"
            initialValues={dadosSelecionados}
          />
        ) : (
          <Cadastro
            titulo={modoCadastro ? "Cadastrar Funcionário" : "Editar Funcionário"}
            campos={[
              { name: "email", label: "Email:", placeholder: "Digite o email do funcionário" },
              { name: "senha", label: "Senha:", placeholder: "Digite a senha" },
              { name: "telefone", label: "Telefone:", placeholder: "Digite o telefone do funcionário" },
            ]}
            onSubmit={handleSegundaEtapa}
            buttonLabel={modoCadastro ? "Cadastrar" : "Salvar"}
            initialValues={dadosSelecionados}
          />
        )}
      </Modal>

    <AreaWorkGeral
  NewText={`Funcionários`}
  titles={["Nome", "Cargo", "E-mail", "Telefone"]}
  abrirModal={abrirModal} // para editar
  abrirModalCadastro={abrirModalCadastro} // para o botão "+"
  tabela={"funcionarios"}
  campos={["nome", "cargo", "email", "telefone"]}
  displayButton="flex"
  atualizarCadastro={atualizarCadastro}
  mostrarBotaoExportar={false}
/>
    </div>
  );
}
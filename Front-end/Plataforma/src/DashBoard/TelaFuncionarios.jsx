import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState } from "react";
import { Modal } from "./Atomos/Modal";
import { Formulario } from "./Formulario";
import axios from "axios";

export function TelaFuncionarios() {
  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [dadosPrimeiraEtapa, setDadosPrimeiraEtapa] = useState({});
  const [dadosSelecionados, setDadosSelecionados] = useState({});
  const token = sessionStorage.getItem('authToken');

  // Defina a função atualizarCadastro aqui:
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
      window.location.reload(); // Atualiza a página após editar
      // Aqui você pode atualizar o estado local ou buscar novamente os dados, se desejar
    } catch (error) {
      alert("Erro ao atualizar cadastro.");
      console.error(error.response?.data || error);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setEtapa(1);
    setDadosPrimeiraEtapa({});
    setDadosSelecionados({});
  };

  const abrirModal = (funcionario = {}) => {
    setDadosSelecionados(funcionario);
    setDadosPrimeiraEtapa({
      nome: funcionario.nome || "",
      sobrenome: funcionario.sobrenome || "",
      cargo: funcionario.cargo || "",
      id: funcionario.id // importante para edição
    });
    setEtapa(1);
    setModalAberto(true);
  };

  const handlePrimeiraEtapa = (dados) => {
    setDadosPrimeiraEtapa(prev => ({ ...prev, ...dados }));
    setEtapa(2);
    return false;
  };

  const handleSegundaEtapa = async (dados) => {
    const funcionarioId = dadosPrimeiraEtapa.id;
    const dadosAtualizados = {
      ...dadosPrimeiraEtapa,
      ...dados,
    };
    try {
      await atualizarCadastro(funcionarioId, dadosAtualizados);
      fecharModal();
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert("Ocorreu um erro ao atualizar o funcionário");
    }
    return false;
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden p-4">
      <Modal isOpen={modalAberto} onClose={fecharModal}>
        {etapa === 1 ? (
          <Formulario
            titulo="Editar Funcionário"
            campos={[
              { name: "nome", label: "Nome:", placeholder: "Digite o nome do funcionário" },
              { name: "sobrenome", label: "Sobrenome:", placeholder: "Digite o sobrenome do funcionário" },
              { name: "cargo", label: "Cargo:", placeholder: "Digite o cargo do funcionário)" },
            ]}
            onSubmit={handlePrimeiraEtapa}
            buttonLabel="Próximo"
            initialValues={dadosSelecionados}
          />
        ) : (
          <Formulario
            titulo="Editar Funcionário"
            campos={[
              { name: "email", label: "Email:", placeholder: "Digite o email do funcionário" },
              { name: "senha", label: "Senha:", placeholder: "Digite a senha" },
              { name: "telefone", label: "Telefone:", placeholder: "Digite o telefone do funcionário)" },
            ]}
            onSubmit={handleSegundaEtapa}
            buttonLabel="Enviar"
            initialValues={dadosSelecionados}
          />
        )}
      </Modal>

      <AreaWorkGeral
        NewText={`Funcionários`}
        titles={["Nome", "Cargo", "E-mail", "Telefone"]}
        abrirModal={abrirModal}
        tabela={"funcionarios"}
        campos={["nome", "cargo", "email", "telefone"]}
        displayButton="flex"
        atualizarCadastro={atualizarCadastro}
        mostrarBotaoExportar={false}
      />
    </div>
  );
}
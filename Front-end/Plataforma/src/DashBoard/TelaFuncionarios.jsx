import React, { useState, useEffect } from "react";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { Modal } from "./Atomos/Modal";
import { Cadastro } from "./Cadastro";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { ButtonAdd } from "../DashBoard/Moleculas/ButtonAdd";

export function TelaFuncionarios() {
  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [dadosPrimeiraEtapa, setDadosPrimeiraEtapa] = useState({});
  const [dadosSelecionados, setDadosSelecionados] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('authToken');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Funções de cadastro e atualização
  const atualizarCadastro = async (id, dadosAtualizados) => {
    if (!token || token.trim() === "") {
      toast.error("Token inválido ou não informado");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/api/funcionarios/atualizar/${id}`,
        dadosAtualizados,
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      toast.success("Funcionário atualizado com sucesso!");
      window.location.reload();
      console.clear();  
    } catch (error) {
      toast.error("Erro ao atualizar cadastro.");
      console.error(error.response?.data || error);
    }
  };

  const cadastrarFuncionario = async (dados) => {
    if (!token || token.trim() === "") {
      toast.error("Token inválido ou não informado");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/funcionarios/cadastro`,
        dados,
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      toast.success("Funcionário cadastrado com sucesso!");
      window.location.reload();
      console.clear();
    } catch (error) {
      toast.error("Erro ao cadastrar funcionário.");
      console.error(error.response?.data || error);
    }
  };

  // Controle do modal
  const fecharModal = () => {
    setModalAberto(false);
    setEtapa(1);
    setDadosPrimeiraEtapa({});
    setDadosSelecionados({});
    setModoCadastro(false);
  };

  const abrirModalCadastro = () => {
    setModoCadastro(true);
    setDadosSelecionados({});
    setDadosPrimeiraEtapa({});
    setEtapa(1);
    setModalAberto(true);
  };

  // Etapas do cadastro
  const handlePrimeiraEtapa = (dados) => {
    setDadosPrimeiraEtapa(prev => ({ ...prev, ...dados }));
    setEtapa(2);
    return false;
  };

  const handleSegundaEtapa = async (dados) => {
    const dadosAtualizados = { ...dadosPrimeiraEtapa, ...dados };
    try {
      if (modoCadastro) {
        await cadastrarFuncionario(dadosAtualizados);
      } else {
        const funcionarioId = dadosPrimeiraEtapa.id;
        await atualizarCadastro(funcionarioId, dadosAtualizados);
        console.clear();
      }
      fecharModal();
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar o funcionário");
      console.error(error);
    }
    return false;
  };

  // Skeleton de loading
  if (loading) {
    return (
       <div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
                    <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
                      <div className="flex items-center fixed top-[4vh] left-[8.5vw]">
                        <Skeleton borderRadius={6} width={250} height={75} />
                      </div>
            
                      <div className="fixed top-[15.5vh] left-[14vw] flex gap-[20vh]">
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
                      </div>
            
                      <div className="flex items-center fixed bottom-[5vh] right-[44vw]">
                        <Skeleton circle width={65} height={65} />
                      </div>
                    </div>
                  </div>
    );
  }

  // Botão visível apenas para determinados cargos
  const cargo = sessionStorage.getItem("cargo");
  const display = cargo === "dono" ? "flex" : "none";

  return (
    <div className="flex flex-col w-full overflow-hidden p-4 opacity-0 animate-fadeInContent" style={{ animationDelay: '0.2s' }}>
      
      {/* Modal */}
      <Modal isOpen={modalAberto} onClose={fecharModal}>
        {etapa === 1 ? (
          <Cadastro
            onSubmit={handlePrimeiraEtapa}
            buttonLabel="Próximo"
            initialValues={dadosSelecionados}
          />
        ) : (
          <Cadastro
            onSubmit={handleSegundaEtapa}
            buttonLabel={modoCadastro ? "Cadastrar" : "Salvar"}
            initialValues={dadosSelecionados}
          />
        )}
      </Modal>

      {/* Área de trabalho / tabela */}
      <AreaWorkGeral
        NewText="Funcionários"
        titles={["Nome", "Cargo", "E-mail", "Telefone"]}
        abrirModalCadastro={abrirModalCadastro}
        tabela="funcionarios"
        campos={["nome", "cargo", "email", "telefone"]}
        displayButton={display}
        atualizarCadastro={atualizarCadastro}
        mostrarBotaoExportar={false}
      />

    </div>
  );
}

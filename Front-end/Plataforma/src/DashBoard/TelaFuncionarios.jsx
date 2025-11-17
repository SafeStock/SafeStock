import React, { useState, useEffect } from "react";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { Modal } from "./Atomos/Modal";
import { Cadastro } from "./Cadastro";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import 'react-loading-skeleton/dist/skeleton.css';
import {  AnimacaoPadrao } from "./Moleculas/AnimacaoLoading";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from '../config/api';

export function TelaFuncionarios() {
  const [modalAberto, setModalAberto] = useState(false);
  const [etapa, setEtapa] = useState(1);
  const [dadosPrimeiraEtapa, setDadosPrimeiraEtapa] = useState({});
  const [dadosSelecionados, setDadosSelecionados] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('authToken');
  const cargo = sessionStorage.getItem("cargo");
  const display = cargo === "dono" ? "flex" : "none";
  const location = useLocation();
  const tela = location.pathname === "/dashboard/telafuncionarios" ? "none" : "flex";
  


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const atualizarCadastro = async (id, dadosAtualizados) => {
    if (!token || token.trim() === "") {
      toast.error("Token inválido ou não informado");
      return;
    }
    try {
      await axios.put(
        `${API_BASE_URL}/api/funcionarios/atualizar/${id}`,
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
        `${API_BASE_URL}/api/funcionarios/cadastro`,
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

  
  if (loading) {
    return (
      <AnimacaoPadrao
      displayButton={display}
      tela={tela} />
    );
  }
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

      
      <AreaWorkGeral
        NewText="Funcionários"
        titles={["Nome", "Cargo", "E-mail", "Telefone"]}
        tabela="funcionarios"
        campos={["nome", "cargo", "email", "telefone"]}
        abrirModal={abrirModalCadastro} 
        displayButton={display}
        atualizarCadastro={atualizarCadastro}
        mostrarBotaoExportar={false}
      />

    </div>
  );
}

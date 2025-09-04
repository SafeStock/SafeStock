import { useState, useEffect } from "react";
import { Modal } from "./Atomos/Modal";
import axios from "axios";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useNavigate } from "react-router-dom";
import { getToken } from "./Moleculas/getToken";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { CadastroUso } from "./CadastroUso";
import { toast } from "react-toastify";
import {  AnimacaoPadrao } from "./Moleculas/AnimacaoLoading";

export function HistoricoUso() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosSelecionados, setDadosSelecionados] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = getToken();
  const navigate = useNavigate();
  const cargo = sessionStorage.getItem("cargo");
  const display = cargo === "dono" ? "none" : "flex";

  useEffect(() => {
    if (!token || token.trim() === "") {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/login");
    }
  }, [token, navigate]);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  const fecharModal = () => {
    setModalAberto(false);
    setDadosSelecionados({});
    setModoCadastro(false);
  };


  const abrirModalEdicao = (registro = {}) => {
    setDadosSelecionados(registro);
    setModoCadastro(false);
    setModalAberto(true);
  };

  const cadastrarRegistro = async (dados) => {
    try {
      await axios.post(
        "http://localhost:8080/api/registroUso/cadastro", console.log("Dados do cadastro:", dados),
        { ...dados, quantidade: Number(dados.quantidade), funcionario: { id: Number(dados.responsavelId) } },
        { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );
      toast.success("Registro cadastrado com sucesso!");
      fecharModal();
      window.location.reload();
      console.clear();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Erro ao cadastrar registro";
      toast.error(errorMsg);
    }
  };


  const handleSubmit = (dados) => {
    console.log(dados);
    if (modoCadastro) cadastrarRegistro(dados);
  };



  if (loading) {
    return (
      <AnimacaoPadrao
        displayButton={display} />
    );
  }

  return (
    <div
      className="flex flex-col w-full overflow-hidden p-4 opacity-0 animate-fadeInContent"
      style={{ animationDelay: '0.2s' }}
    >

      <Modal isOpen={modalAberto} onClose={fecharModal}>
        <CadastroUso
          titulo="Registro de Uso"
          onSubmit={handleSubmit}
          buttonLabel="Cadastrar"
          initialValues={dadosSelecionados}
        />
      </Modal>


      <AreaWorkGeral
        NewText={`Histórico de Uso`}
        titles={["Produto", "Quantidade", "Responsável", "Data Saída"]}
        tabela="registroUso"
        campos={["produto", "quantidade", "funcionarioNome", "dataHoraSaida"]}
        displayButton={display}
        abrirModal={abrirModalEdicao}

      />
    </div>
  );
}

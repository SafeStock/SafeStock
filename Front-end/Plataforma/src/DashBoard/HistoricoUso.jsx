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

export function HistoricoUso() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosSelecionados, setDadosSelecionados] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = getToken();
  const navigate = useNavigate();

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

  const cargo = sessionStorage.getItem('cargo');
  let display = cargo === 'limpeza' ? 'flex' : 'none';

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
      <div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
             <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
               <div className="flex items-center fixed top-[4vh] left-[8.5vw]">
                 <Skeleton borderRadius={6} width={350} height={75} />
               </div>
     
               <div className="flex items-center fixed top-[6vh] right-[6vw]">
                 <Skeleton circle width={50} height={50} />
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

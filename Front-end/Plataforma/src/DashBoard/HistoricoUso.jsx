import { useState, useEffect } from "react";
import { Modal } from "./Atomos/Modal";
import axios from "axios";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useNavigate } from "react-router-dom";
import { getToken } from "./Moleculas/getToken";
import { Cadastro } from "./Cadastro";

export function HistoricoUso() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosSelecionados, setDadosSelecionados] = useState({});
  const [modoCadastro, setModoCadastro] = useState(false); // Novo estado
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || token.trim() === "") {
      alert("Sessão expirada. Faça login novamente.");
      navigate("/login");
    }
  }, [token, navigate]);

  const cargo = sessionStorage.getItem('cargo');
  let display = 'none';
  if (cargo === 'limpeza') {
    display = 'flex';
  }

  const fecharModal = () => {
    setModalAberto(false);
    setDadosSelecionados({});
    setModoCadastro(false); 
  };

  // Função para abrir modal de CADASTRO
  const abrirModalCadastro = () => {
    setDadosSelecionados({});
    setModoCadastro(true);
    setModalAberto(true);
  };

  // Função para abrir modal de EDIÇÃO
  const abrirModalEdicao = (registro = {}) => {
    setDadosSelecionados(registro);
    setModoCadastro(false);
    setModalAberto(true);
  };

  // Função centralizada para cadastrar registro
  const cadastrarRegistro = async (dados) => {
    try {
      await axios.post(
        "http://localhost:8080/api/registroUso/cadastro",
        {
          ...dados,
          quantidade: Number(dados.quantidade)
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert("Registro cadastrado com sucesso!");
      fecharModal();
      setTimeout(() => navigate("/dashboardlimpeza"), 1000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Erro ao cadastrar registro";
      alert(errorMsg);
    }
  };

  const handleSubmit = (dados) => {
    // Modo cadastro sempre usa POST
    if (modoCadastro) {
      cadastrarRegistro(dados);
    }
    // (Aqui pode adicionar lógica para edição se necessário)
  };

  return (
    <div className="flex flex-col w-full overflow-x-hidden p-4">
      {/* Botão de cadastro (visível apenas para limpeza) */}
      <div style={{ display }}>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4 w-48 self-end"
          onClick={abrirModalCadastro}
        >
          Cadastrar Registro
        </button>
      </div>

      <Modal isOpen={modalAberto} onClose={fecharModal}>
        <Cadastro
          titulo="Registro de Uso"
          campos={[
            {
              name: "produto",
              label: "Produto:",
              placeholder: "Nome do produto",
              type: "text",
              required: true
            },
            {
              name: "quantidade",
              label: "Quantidade:",
              placeholder: "Quantidade usada",
              type: "number",
              min: 1,
              required: true
            },
            {
              name: "dataValidade",
              label: "Data Validade:",
              type: "date",
              required: true
            },
            {
              name: "dataHoraSaida",
              label: "Data Saída:",
              type: "datetime-local",
              required: true
            },
          ]}
          onSubmit={handleSubmit}
          buttonLabel="Cadastrar"
          initialValues={dadosSelecionados}
        />
      </Modal>

      <AreaWorkGeral
        NewText={`Histórico de Uso`}
        titles={["Produto", "Quantidade", "Data Validade", "Data Saída"]}
        tabela="registroUso"
        campos={["produto", "quantidade", "dataValidade", "dataHoraSaida"]}
        displayButton={display}
        abrirModal={abrirModalEdicao} // Para edição
      />
    </div>
  );
}
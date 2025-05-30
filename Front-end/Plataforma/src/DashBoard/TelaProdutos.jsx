import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState } from "react";
import { Modal } from "./Atomos/Modal";
import { Formulario } from "./Formulario";



export function TelaProdutos() {
  const [modalAberto, setModalAberto] = useState(false);
    const [etapa, setEtapa] = useState(1);
    const [dadosPrimeiraEtapa, setDadosPrimeiraEtapa] = useState({});
  
    const fecharModal = () => {
      setModalAberto(false);
      setEtapa(1);
      setDadosPrimeiraEtapa({});
    };
  
    const handlePrimeiraEtapa = (dados) => {
      setDadosPrimeiraEtapa(dados);
      setEtapa(2);
      return false; // Isso impede a navegação
    };
  
    const handleSegundaEtapa = (dados) => {
      console.log({ ...dadosPrimeiraEtapa, ...dados });
      fecharModal();
      return false; // Isso impede a navegação
    };
  

  return (
    <div className="flex flex-col w-full">
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
                />
              ) : (
                <Formulario
                  titulo="Editar Funcionário"
                  campos={[
                    { name: "email", label: "Email:", placeholder: "Digite o email do funcionário" },
                    { name: "senha", label: "Senha:", placeholder: "Digite a senha" },
                    { name: "telefone", label: "Telefone:", placeholder: "Digite o telefone do funcionário)" },
                  ]}
                  onSubmit={handleSegundaEtapa} // This is correct, it will be called when the form is submitted
                  buttonLabel="Enviar"
                  initialValues={{ email: dadosPrimeiraEtapa.email || "" }}
                />
              )}
            </Modal>

      <AreaWorkGeral
        NewText="Produtos"
        titles={["Nome", "Categoria", "Quantidade", "Limite", "Data de Validade", "Data de Entrada"]}
        tabela="produtos"
        campos={["nome", "categoriaProduto","quantidade", "limiteSemanalDeUso", "dataValidade", "dataEntrada"]}
      />
    </div>
  );
}
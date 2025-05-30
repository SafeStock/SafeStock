import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState } from "react";
import { Modal } from "./Atomos/Modal";
import { Formulario } from "./Formulario";

export function TelaFuncionarios() {
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
    return false; // 
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
            onSubmit={handleSegundaEtapa} // 
            buttonLabel="Enviar"
            initialValues={{ email: dadosPrimeiraEtapa.email || "" }}
          />
        )}
      </Modal>

      <AreaWorkGeral
        NewText={`Funcionários`}
        titles={["Nome", "Cargo", "E-mail", "Telefone"]}
        abrirModal={() => setModalAberto(true)}
        tabela={"funcionarios"}
        campos={["nome", "cargo", "email", "telefone"]}
      />
    </div>
  );
}
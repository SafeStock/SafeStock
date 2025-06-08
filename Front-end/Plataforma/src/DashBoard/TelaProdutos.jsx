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
          />
        ) : (
          <Formulario
            titulo="Editar Produtos"
            campos={[
              { name: "limiteDeUso", label: "Limite de uso:", placeholder: "Digite o limite de uso semanal" },
              { name: "dataValidade", label: "Data de validade:", placeholder: "Digite a data de validade (ex: 08/27)" },
              { name: "dataEntrada", label: "Data de entrada:", placeholder: "Digite a data de entrada (ex: 08/27)" },
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
        campos={["nome", "categoriaProduto", "quantidade", "limiteSemanalDeUso", "dataValidade", "dataEntrada"]}
        abrirModal={() => setModalAberto(true)}
      />
    </div>
  );
}
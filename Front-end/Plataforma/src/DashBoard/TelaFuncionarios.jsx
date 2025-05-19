import { useState } from "react";
import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { Modal } from "./Atomos/Modal";

export function TelaFuncionarios() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <FundoPadrao>
      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
      <NavBarArea />

      <AreaWorkGeral
        NewText="Funcionários"
        DisplayFlexParaFuncionarios="flex"
        DisplayParaProdutos="none"
        DisplayHistoricoAlerta="none"
        DisplayHistoricoUso="none"
        abrirModal={() => setModalAberto(true)} // envia a função
      />
    </FundoPadrao>
  );
}

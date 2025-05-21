import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState } from "react";
import { Modal } from "./Atomos/Modal";

export function TelaFuncionarios() {

    const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="flex justify-end items-end">
      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
      <AreaWorkGeral
        NewText={`Funcionários`}
        titles={["Nome","SobreNome"]}
        abrirModal={() => setModalAberto(true)}
      />
    </div>
  );
}

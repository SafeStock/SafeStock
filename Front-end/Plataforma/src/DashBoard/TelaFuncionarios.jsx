import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState } from "react";
import { Modal } from "./Atomos/Modal";

export function TelaFuncionarios() {

    const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="flex">
      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} />
      <AreaWorkGeral
        NewText={`Funcionários`}
        titles={["Nome","Cargo", "E-mail", "Telefone"]}
        abrirModal={() => setModalAberto(true)}
        tabela={"funcionarios"}
        campos={["nome","cargo", "email", "telefone"]}
      />

      
    </div>
  );
}

import { useState } from "react";
import { BtnNotification } from "../Atomos/BtnNotification";
import { ModalNotification } from "../Atomos/ModalNotification";

export function AreaTittle({ texto }) {
  // 🔹 Estado centralizado aqui
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row w-[91vw] h-[14.2vh] text-[#3A577B] text-[3.5vh] items-center ml-[9vw]">
        <h2 className="mt-[2vh]">{texto}</h2>

        {/* 🔸 Passa uma função para abrir o modal */}
        <BtnNotification onClick={() => setIsOpen(true)} />
      </div>

      {/* 🔸 Passa o estado e a função de fechar */}
      <ModalNotification isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );

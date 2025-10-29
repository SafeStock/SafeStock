import { useState } from "react";
import { BtnNotification } from "../Atomos/BtnNotification";
import { ModalNotification } from "../Atomos/ModalNotification";

export function AreaTittle({ texto }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row w-[91vw] h-[14.2vh] text-[#3A577B] text-[3.5vh] items-center ml-[9vw]">
        <h2 className="mt-[2vh]">{texto}</h2>

        <BtnNotification onClick={() => setIsOpen(true)} />
      </div>
      <ModalNotification isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

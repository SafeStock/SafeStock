
import { AreaNotification } from "./AreaNotification";

export function ModalNotification({ isOpen, onClose }) {

  if (!isOpen) return null;
  

  return (
    <div
      className={`fixed animate-showing inset-0 z-[900] bg-[rgba(0,0,0,0.4)] h-[100vh] w-[100vw] flex justify-end`}
      onClick={onClose}
    >
      <div
        className="h-[100vh] w-[32vw] animate-fade-in-left rounded-l-[1vw] shadow-[0px_4px_4px_rgba(0,0,0,0.75)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#3A577B] w-full h-[7vh] flex justify-center items-center">
          <div className="cursor-pointer absolute text-[white] text-[3.5vh] right-[30vw]"
          onClick={onClose}>x</div>
        </div>

        <AreaNotification 
        NewText={`Historico de Alertas`}
        tabela={"historicoAlertas"}
        campos={[ "produto.nome", "descricao", "dataHora"]}/>

        <div
          className="bg-[#3A577B] w-full h-[7vh] flex justify-center items-center hover:bg-white hover:text-[#3A577B]"
        >
        </div>
      </div>
    </div>
  );
}

import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "./AreaWork";

export function AreaWorkGeral({ NewText, titles, abrirModal}) {
  return (
    <div className="flex flex-col tamanho-variavel bg-transparent">
      <AreaTittle texto={NewText} />
      <div className="flex w-[100vw] h-[85vh] items-center justify-center">
        <AreaWork 
        titles={titles} 
        abrirModal={abrirModal}
      />
      </div>
    </div>
  );
}


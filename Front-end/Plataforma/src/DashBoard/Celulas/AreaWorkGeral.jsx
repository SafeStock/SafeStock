import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "./AreaWork";

export function AreaWorkGeral({ NewText, titles, abrirModal}) {
  return (
    <div className="flex flex-col tamanho-variavel bg-transparent">
      <AreaTittle texto={NewText} />
      <div className="flex flex-1">
        <AreaWork 
        titles={titles} 
        abrirModal={abrirModal}/>
      </div>
    </div>
  );
}


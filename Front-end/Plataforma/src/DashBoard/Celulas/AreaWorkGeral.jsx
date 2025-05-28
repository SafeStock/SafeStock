import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "./AreaWork";

export function AreaWorkGeral({ NewText, titles, abrirModal, tabela, campos }) {
  

  return (
    <div className="flex flex-col tamanho-variavel bg-transparent">
      <AreaTittle texto={NewText} />
      <div className="flex w-[100vw] h-[85vh] items-start justify-center">
        <AreaWork 
        titles={titles} 
        abrirModal={abrirModal}
        tabela={tabela} 
        campos={campos}
      />
      </div>
    </div>
  );
}


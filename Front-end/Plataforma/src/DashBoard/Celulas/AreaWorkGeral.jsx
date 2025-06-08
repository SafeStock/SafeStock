import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "./AreaWork";
import { ButtonAdd } from "../Moleculas/ButtonAdd";

export function AreaWorkGeral({ NewText, titles, abrirModal, tabela, campos, displayButton }) {
  

  return (
    <div className="flex flex-col tamanho-variavel bg-transparent">
      <AreaTittle texto={NewText} />
      <div className="flex flex-col w-[100vw] h-[85vh] items-center ">
        <AreaWork 
        titles={titles} 
        abrirModal={abrirModal}
        tabela={tabela} 
        campos={campos}
      />
        <ButtonAdd abrirModal={abrirModal} displayButton={displayButton} />
      </div>
    </div>
  );
}


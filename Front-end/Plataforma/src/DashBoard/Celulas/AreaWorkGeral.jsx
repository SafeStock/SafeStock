import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "./AreaWork";

export function AreaWorkGeral({ NewText, titles, abrirModal, tabela, campos }) {
  

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

      <div className="w-[10vw] h-[16vh] flex items-center justify-center mt-[2vh] ml-[3vw]">
        <button
          onClick={abrirModal}
          className="border-0 bg-[#3A577B] text-[26px] text-[#eee] font-[600] rounded-[50%]
        w-[3vw] h-[6vh] cursor-pointer hover:bg-[white] hover:text-[#2F4772] 
        hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200 "
        >
          +
        </button>

      </div>
      </div>
    </div>
  );
}


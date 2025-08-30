import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "./AreaWork";
import { ButtonAdd } from "../Moleculas/ButtonAdd";

export function AreaWorkGeral({ NewText, titles, abrirModal, tabela, campos, displayButton, atualizarCadastro, mostrarBotaoExportar}) {

  return (
    <div className="flex flex-col tamanho-variavel bg-transparent">
      <AreaTittle texto={NewText} />
      <div className="relative bottom-[3vh] flex flex-col w-[100vw] h-[85.7vh] items-center ">
        <AreaWork
          titles={titles}
          abrirModal={abrirModal}
          tabela={tabela}
          campos={campos}
          displayButton="flex"
          atualizarCadastro={atualizarCadastro}
          mostrarBotaoExportar={mostrarBotaoExportar}
        />
        <ButtonAdd abrirModal={abrirModal} displayButton={displayButton} />
      </div>
    </div>
  );
}


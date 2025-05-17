import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { Modal } from "./Atomos/Modal";

export function DashLimpeza() {

  const nome = sessionStorage.getItem('usuario');

  return (


    <FundoPadrao>
      <Modal/>
      <NavBarArea />

      <AreaWorkGeral
        NewText={`Boas Vindas, ${nome}!`}
        DisplayPadrao='flex'
        DisplayFlexParaFuncionarios='none'
        DisplayParaDashGeral='flex'
      />

    </FundoPadrao>
  );
}
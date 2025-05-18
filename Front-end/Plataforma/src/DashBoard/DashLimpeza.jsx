import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function DashLimpeza() {

  const nome = sessionStorage.getItem('usuario');

  return (


    <FundoPadrao>
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
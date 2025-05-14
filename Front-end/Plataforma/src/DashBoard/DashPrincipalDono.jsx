import { NavBarArea } from "./Celulas/NavBarArea";
import { FundoPadrao } from "./Celulas/FundoPadrao";
import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";

export function DashPrincipalDono() {

  const nome = sessionStorage.getItem('usuario');

  return (
    <FundoPadrao>
      <NavBarArea />

      <AreaWorkGeral
        NewText={`Boas Vindas, ${nome}!`}
        DisplayFlexParaFuncionarios='none'
        DisplayParaDashGeral='flex'
      />

    </FundoPadrao>
  );
}
import { AreaTittle } from "./Moleculas/AreaTittle";
import { AreaWorkDashLimpeza } from "./Celulas/AreaWorkDashLimpeza";

export function DashLimpeza() {

  const nome = sessionStorage.getItem('usuario');

  return (


    <div className="h-full overflow-x-hidden w-[100vw] bg-transparent flex flex-col justify-end items-end">
      <AreaTittle texto={`Boas Vindas, ${nome}!`} />
      <AreaWorkDashLimpeza />
    </div>
  );
}
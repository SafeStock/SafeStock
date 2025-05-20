import { AreaTittle } from "./Moleculas/AreaTittle"
import { AreaWorkDashDono } from "./Celulas/AreaWorkDashDono"

export function DashPrincipalDono() {
  const nome = sessionStorage.getItem('usuario')

  return (
    <div className=" relative left-[13vh] h-[100vh] w-full bg-transparent items-center flex flex-col ">
      <AreaTittle texto={`Boas Vindas, ${nome}!`} />
      <AreaWorkDashDono />
    </div>
  )
}


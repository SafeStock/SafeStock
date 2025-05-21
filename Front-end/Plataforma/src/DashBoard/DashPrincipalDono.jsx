import { AreaTittle } from "./Moleculas/AreaTittle"
import { AreaWorkDashDono } from "./Celulas/AreaWorkDashDono"

export function DashPrincipalDono() {
  const nome = sessionStorage.getItem('usuario')

  return (
    <div className="h-full overflow-x-hidden w-[100vw] bg-transparent flex flex-col justify-end items-end">
      <AreaTittle texto={`Boas Vindas, ${nome}!`} />
      <AreaWorkDashDono />
    </div>
  )
}


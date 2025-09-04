import { useEffect, useState } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import { AreaTittle } from "./Moleculas/AreaTittle";
import { AreaWorkDashLimpeza } from "./Celulas/AreaWorkDashLimpeza";
import { AnimacaoDash } from "./Moleculas/AnimacaoLoading";

export function DashLimpeza() {
  const nome = sessionStorage.getItem('usuario');
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return (
    <AnimacaoDash />
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center animate-fadeInContent">
      <AreaTittle texto={`Boas Vindas, ${nome}!`} />
      <AreaWorkDashLimpeza />
    </div>
  );
}

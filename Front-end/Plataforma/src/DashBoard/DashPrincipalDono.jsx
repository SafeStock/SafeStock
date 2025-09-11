import { AreaTittle } from "./Moleculas/AreaTittle";
import { AreaWorkDashDono } from "./Celulas/AreaWorkDashDono";
import { useEffect, useState } from "react";
import {  AnimacaoDash } from "./Moleculas/AnimacaoLoading";

export function DashPrincipalDono() {
  const nome = sessionStorage.getItem('usuario');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  
  if (loading) {
    return (
      < AnimacaoDash />
    );
  }

  return (
    <div className="h-full  w-full bg-transparent flex flex-col justify-end items-end opacity-0 animate-fadeInContent">
      <AreaTittle texto={`Boas Vindas, ${nome}!`} />
      <AreaWorkDashDono />
    </div>
  );
}


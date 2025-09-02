import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { AreaTittle } from "./Moleculas/AreaTittle";
import { AreaWorkDashLimpeza } from "./Celulas/AreaWorkDashLimpeza";

export function DashLimpeza() {
  const nome = sessionStorage.getItem('usuario');

  // Estados para os dados da Dash
  const [kpis, setKpis] = useState(null);
  const [listaUso, setListaUso] = useState(null);

  // Loading só termina quando todos os dados chegarem
  const loading = !kpis || !listaUso;

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/kpis");
        const data = await res.json();
        setKpis(data);
      } catch (err) {
        console.error("Erro ao buscar KPIs:", err);
      }
    };

    const fetchListaUso = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/uso");
        const data = await res.json();
        setListaUso(data);
      } catch (err) {
        console.error("Erro ao buscar Lista de Uso:", err);
      }
    };

    fetchKPIs();
    fetchListaUso();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full items-center justify-start min-h-screen p-6 bg-gray-100 gap-6">
        <Skeleton borderRadius={6} width="60%" height={60} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <Skeleton borderRadius={6} height={120} />
          <Skeleton borderRadius={6} height={120} />
          <Skeleton borderRadius={6} height={120} />
          <Skeleton borderRadius={6} height={120} />
        </div>
        <div className="flex flex-col gap-4 w-full max-w-5xl">
          <Skeleton borderRadius={10} height={250} />
          <Skeleton borderRadius={10} height={150} />
        </div>
        <div className="w-full md:w-[600px]">
          <Skeleton borderRadius={10} height={400} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center animate-fadeInContent" style={{ animationDelay: '0.2s' }}>
      <AreaTittle texto={`Boas Vindas, ${nome}!`} />
      <AreaWorkDashLimpeza kpis={kpis} listaUso={listaUso} />
    </div>
  );
}

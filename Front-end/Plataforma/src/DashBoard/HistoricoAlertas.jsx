import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState, useEffect } from "react";
import {  AnimacaoPadrao } from "./Moleculas/AnimacaoLoading";

export function HistoricoAlertas() {
  const [loading, setLoading] = useState(true);
  const cargo = sessionStorage.getItem("cargo");
  const display = cargo === "dono" ? "flex" : "none";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
     <AnimacaoPadrao
      displayButton={display} 
      />
    );
  }

  return (
    <div
      className="flex overflow-hidden opacity-0 animate-fadeInContent"
      style={{ animationDelay: '0.2s' }}
    >
      <AreaWorkGeral
        NewText={`Historico de Alertas`}
        titles={["Alerta", "Produto", "Status", "Data e Hora"]}
        tabela={"historicoAlertas"}
        campos={["status", "produto.nome", "descricao", "dataHora"]}
      />
    </div>
  );
}

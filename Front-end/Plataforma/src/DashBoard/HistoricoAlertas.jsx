import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState, useEffect } from "react";
import { AnimacaoPadrao } from "./Moleculas/AnimacaoLoading";
import { WS_BASE_URL } from '../config/api';

export function HistoricoAlertas() {
  const [loading, setLoading] = useState(true);
  const [notificacoes, setNotificacoes] = useState([]); // novos alertas recebidos
  const cargo = sessionStorage.getItem("cargo");
  const display = cargo === "dono" ? "none" : "flex";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Conecta ao WebSocket do backend (Spring Boot)
    const socket = new WebSocket(`${WS_BASE_URL}/ws/alertas`);

    socket.onopen = () => {
      console.log("✅ Conectado ao WebSocket de alertas");
    };

    socket.onmessage = (event) => {
      const mensagem = event.data;
      console.log("🔔 Novo alerta recebido:", mensagem);
      setNotificacoes((prev) => [...prev, mensagem]);
    };

    socket.onclose = () => {
      console.log("❌ Conexão encerrada com o WebSocket");
    };

    return () => socket.close();
  }, []);

  if (loading) {
    return <AnimacaoPadrao displayButton={display} />;
  }

  return (
    <div
      className="flex flex-col overflow-hidden opacity-0 animate-fadeInContent"
      style={{ animationDelay: "0.2s" }}
    >
      {/* Exibe aviso visual de novos alertas */}
      {notificacoes.length > 0 && (
        <div className="bg-yellow-100 text-yellow-900 p-3 rounded-md shadow-md mb-4">
          <strong>🔔 Novo alerta recebido:</strong>
          <div className="mt-1 text-sm">
            {notificacoes[notificacoes.length - 1]}
          </div>
        </div>
      )}

      <AreaWorkGeral
        NewText={`Histórico de Alertas`}
        titles={["Alerta", "Produto", "Status", "Data e Hora"]}
        tabela={"historicoAlertas"}
        campos={["status", "produto.nome", "descricao", "dataHora"]}
      displayButton={"none"}
      />
    </div>
  );
}

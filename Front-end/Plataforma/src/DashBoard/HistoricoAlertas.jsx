import { AreaWorkGeral } from "./Celulas/AreaWorkGeral";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export function HistoricoAlertas() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full items-center justify-center min-h-screen p-4 bg-gray-100 gap-4">
        <div className="flex w-full max-w-[900px] gap-2 animate-fadeIn">
          <div className="flex items-center fixed top-[4vh] left-[8.5vw]">
            <Skeleton borderRadius={6} width={420} height={75} />
          </div>

          <div className="flex items-center fixed top-[6vh] right-[6vw]">
            <Skeleton circle width={50} height={50} />
          </div>

          <div className="fixed top-[15.5vh] left-[14vw] flex gap-[20vh]">
            <Skeleton borderRadius={6} width={150} height={65} />
            <Skeleton borderRadius={6} width={150} height={65} />
            <Skeleton borderRadius={6} width={150} height={65} />
            <Skeleton borderRadius={6} width={150} height={65} />
          </div>

          <div className="fixed flex flex-col top-[26vh] right-[1.3vw] gap-[1.2vh]">
            <Skeleton borderRadius={10} width={1410} height={90} />
            <Skeleton borderRadius={10} width={1410} height={90} />
            <Skeleton borderRadius={10} width={1410} height={90} />
            <Skeleton borderRadius={10} width={1410} height={90} />
            <Skeleton borderRadius={10} width={1410} height={90} />
          </div>
        </div>
      </div>
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

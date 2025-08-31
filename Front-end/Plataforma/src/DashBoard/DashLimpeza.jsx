import { AreaTittle } from "./Moleculas/AreaTittle";
import { AreaWorkDashLimpeza } from "./Celulas/AreaWorkDashLimpeza";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export function DashLimpeza() {
  const nome = sessionStorage.getItem('usuario');
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
            <Skeleton borderRadius={6} width={550} height={75} />
          </div>
          
          <div className="fixed top-[14.5vh] left-[7vw] flex gap-[1vh]">
            <Skeleton borderRadius={6} width={195} height={155} />
            <Skeleton borderRadius={6} width={195} height={155} />
            <Skeleton borderRadius={6} width={195} height={155} />
            <Skeleton borderRadius={6} width={195} height={155} />
          </div>

          <div className="fixed flex flex-col top-[34vh] left-[7vw] gap-[1.2vh]">
            <Skeleton borderRadius={10} width={810} height={330} />
            <Skeleton borderRadius={10} width={810} height={190} />
          </div>

          <div className="fixed flex flex-col top-[14.5vh] right-[0.2vw] gap-[1.2vh]">
            <Skeleton borderRadius={10} width={600} height={700} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-x-hidden w-[100vw] bg-transparent flex flex-col justify-end items-end opacity-0 animate-fadeInContent">
      <AreaTittle texto={`Boas Vindas, ${nome}!`} />
      <AreaWorkDashLimpeza />
    </div>
  );
}

import { FotoFundoPadrao } from "../Atomos/FotoFundoPadrao";

export function FundoPadrao({ children }) {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden relative">
      <FotoFundoPadrao />
      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-row">
        {children}
      </div>
    </div>
  );
}

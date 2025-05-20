import { AreaTittle } from "../Moleculas/AreaTittle";
import { AreaWork } from "./AreaWork";

export function AreaWorkGeral({ NewText, titles }) {
  return (
    <div className="flex flex-col w-full h-full bg-transparent">
      <AreaTittle texto={NewText} />
      <div className="flex flex-1 w-full">
        <AreaWork titles={titles} />
      </div>
    </div>
  );
}


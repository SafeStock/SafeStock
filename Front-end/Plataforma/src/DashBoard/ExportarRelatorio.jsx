import { AreaTittle } from "./Moleculas/AreaTittle";
import { AreaWorkExportar } from "./Celulas/AreaWorKExportar";

export function ExportarRelatorio() {
  return (
    <div>
        <AreaTittle texto={`Exportar Relatório`} />
        <AreaWorkExportar />

    </div>
  );
}

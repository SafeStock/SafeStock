import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { exportarExcel } from "./exportarExcel";

export async function exportarExcelMulti(tabelas, nomeArquivo) {
  // tabelas = [{ titulo: "Produtos", dados, titles, campos }, ...]
  const workbook = new ExcelJS.Workbook();

  for (let i = 0; i < tabelas.length; i++) {
    const { titulo, dados, titles, campos } = tabelas[i];

    // Adiciona título de cada tabela como uma "sheet" separada
    await exportarExcel(dados, titles, titulo, campos, workbook);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${nomeArquivo}.xlsx`);
  toast.success("Arquivo baixado com sucesso!");

  return workbook;
}

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

// Função para exportar uma tabela
export async function exportarExcel(dados, titles, nomeArquivo, campos, workbookExistente) {
  const workbook = workbookExistente || new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(nomeArquivo);

  function acessarPropriedade(obj, caminho) {
    return caminho.split('.').reduce((acc, parte) => acc && acc[parte], obj);
  }

  worksheet.addTable({
    name: `Tabela_${nomeArquivo}`,
    ref: "A1",
    headerRow: true,
    style: {
      theme: "TableStyleMedium9",
      showRowStripes: true,
    },
    columns: titles.map((campo) => ({ name: campo })),
    rows: dados.map((row) => campos.map((c) => acessarPropriedade(row, c) ?? "")),
  });

  // Ajusta largura das colunas
  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellValue = cell.value ? cell.value.toString() : "";
      maxLength = Math.max(maxLength, cellValue.length);
    });
    column.width = maxLength + 2;
  });

  if (!workbookExistente) {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${nomeArquivo}.xlsx`);
    toast.success("Arquivo baixado com sucesso!");
  }

  return workbook;
}

// Função para exportar múltiplas tabelas no mesmo arquivo
export async function exportarExcelMulti(tabelas, nomeArquivo) {
  const workbook = new ExcelJS.Workbook();

  for (const tabela of tabelas) {
    const { nome, dados, titles, campos } = tabela;
    await exportarExcel(dados, titles, nome, campos, workbook);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${nomeArquivo}.xlsx`);
  toast.success("Arquivo com todas as tabelas baixado com sucesso!");
}

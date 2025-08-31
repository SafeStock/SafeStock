import ExcelJS from "exceljs"; // Biblioteca pra manipular a por caria dos arquivos XLSX.
import { saveAs } from "file-saver"; //ota biblioteca pra salvar os arquivos.
import { toast } from "react-toastify";

export async function exportarExcel(dados, titles, nomeArquivo, campos) {
  const workbook = new ExcelJS.Workbook(); // aqui é onde cria um novo arquivo em excel, é tipo criar uma classe e java.
  const worksheet = workbook.addWorksheet("Dados");// // Aqui ele cria uma planilha a esse novo arquivo, no caso é esse que vamos manipular.

function acessarPropriedade(obj, caminho) { // Bom essa função basicamente te permite acessar os campos dos jsons com fk, por exemplo o historico de alerta, que tem um fkProduto, pra conseguir acesar o nome do produto que estava dentro da fk, eu tive que criar essa função que me permite acessar o produto.nome.
  return caminho.split('.').reduce((acc, parte) => acc && acc[parte], obj);
}


  // Estilização 
  worksheet.addTable({
    name: "TabelaDados", // esse é fácil, é o nome padrão da tabela.
    ref: "A1", // Aqui é a célula de referência, ou seja, a célula onde, a partir delas serão gerados os campos
    headerRow: true, // Aqui é o controle sobre os títulos de cada campo, vai ter(true), não vai(false).
    style: { //Aqui é de prache, muda os estilos, já setados do excel, não precisando definir cor, ou estilo de escrita, campo a campo.
      theme: "TableStyleMedium9", // Aqui é um dos estilos do excel, eu vi um dos que tinha o excel e setei aqui com o nome desse estilo.
      showRowStripes: true, // Isso aqui ativa aquela faixa zebrada(Faixa zebrada é aquele efeito que se alterna de um linha com cor forte, e outra com a mesma cor só que mais fraca) do Excel.
    },
    columns: titles.map((campo) => ({ name: campo })), // Aqui o mesmo, ele cria as colunas da tabela com os nomes que estão no array campos.
    rows: dados.map((row) => campos.map((c) => acessarPropriedade(row, c) ?? "")) // Aqui segue a mesma lógica dos decima só que para os dados referente a esses campos, com o adendo de que respeita a ordem dos campos, se o dado estiver faltando, coloca uma string vazia.
  });

  // Largura das colunas
  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const cellValue = cell.value ? cell.value.toString() : ""; // Verifica o comprimento do conteúdo de cada célula e transforma tudo em string.
      maxLength = Math.max(maxLength, cellValue.length); // Calcula o maior comprimento encontrado em cada coluna,meio que deixar padrão pra todas as cpelulas.
    });
    column.width = maxLength + 2; // Aqui ele define a largura da coluna para o maior comprimento + 2 espaços extras.
  });

  const buffer = await workbook.xlsx.writeBuffer();// 
  const blob = new Blob([buffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  }); // Aqui ele cria um Blob(objeto de dados binários), com o conteúdo do buffer e o tipo(MIME) correto para esse tipo de arquivo Excel(.xlsx).



  saveAs(blob, `${nomeArquivo}.xlsx`); // Aqui ele força o download do arquivo no navegador com o nome específico da tabela, incluindo a extensão .xlsx
  toast.success("Arquivo baixado com sucesso!");
}

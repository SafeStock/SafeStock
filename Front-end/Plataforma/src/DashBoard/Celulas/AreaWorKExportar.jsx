import React, { useState } from "react";
import { ExportInformationDiv } from "../Moleculas/ExportInformationDiv";
import axios from "axios";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { saveAs } from "file-saver";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import ExcelJS from "exceljs";
import { AreaTittle } from "../Moleculas/AreaTittle";
import { API_BASE_URL } from '../../config/api';
registerLocale("pt-BR", ptBR);

export function AreaWorkExportar() {
  const [month, setMonth] = useState(new Date());

  // Limpar toasts quando o componente desmontar
  React.useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);



  const endpoints = {
    produtos: { table: "produtos", label: "Produtos", fetchUrl: `${API_BASE_URL}/produtos` },
    registros: { table: "registro_uso", label: "Registros de Uso", fetchUrl: `${API_BASE_URL}/registroUso` },
    alertas: { table: "alertas", label: "Alertas", fetchUrl: `${API_BASE_URL}/historicoAlertas` },
  };

  async function tryBackendExport(tableName, outName, checkOnly = false) {
    try {
      const token = sessionStorage.getItem("authToken");
      const headers = token
        ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" };

      const payload = [
        {
          table: tableName,
          month: month ? month.toISOString().slice(0, 7) : undefined, // yyyy-MM
        },
      ];

      console.log("Fazendo requisição para:", `${API_BASE_URL}/export/excel`, "com payload:", payload);

      const res = await axios.post(`${API_BASE_URL}/export/excel`, payload, {
        responseType: "arraybuffer",
        headers,
      });

      console.log("Resposta recebida com status:", res.status);

      if (res.status === 204) {
        console.log("Status 204 detectado - nenhum dado encontrado");
        if (!checkOnly) {
          toast.error("Nenhum dado encontrado para exportar.");
        }
        return false;
      }

      if (res.status !== 200) {
        console.error("Backend export failed with status:", res.status);
        if (!checkOnly) {
          toast.error(`Erro no servidor: Status ${res.status}`);
        }
        return false;
      }

      // Se é só para verificar, não faz download
      if (checkOnly) {
        console.log("Verificação concluída: dados encontrados");
        return true;
      }

      // Faz download do arquivo
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, outName.endsWith(".xlsx") ? outName : `${outName}.xlsx`);
      return true;
    } catch (err) {
      console.error("Erro capturado no try/catch:", err);
      
      // Verificar se é um erro HTTP com status 204
      if (err.response && err.response.status === 204) {
        console.log("Erro 204 capturado no catch");
        if (!checkOnly) {
          toast.error("Nenhum dado encontrado para exportar.");
        }
        return false;
      }
      
      console.warn("Backend export failed", err?.message || err);
      if (!checkOnly) {
        toast.error("Erro ao exportar relatório: " + (err.response?.statusText || err.message));
      }
      return false;
    }
  }

  async function fetchJson(url) {
    try {
      const token = sessionStorage.getItem("authToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      console.log(`Fazendo requisição GET para: ${url}`);
      console.log("Headers:", headers);
      
      const res = await axios.get(url, { headers });

      console.log(`Resposta de ${url}:`, res.status, "Dados:", res.data ? `${Array.isArray(res.data) ? res.data.length : 'não é array'} itens` : 'sem dados');

      if (res.status === 204) {
        console.log("Status 204 recebido - nenhum dado encontrado");
        return [];
      }

      if (res.status !== 200) {
        console.error("Failed to fetch data with status:", res.status);
        return [];
      }

      // Aplicar filtro por mês nos dados retornados
      let data = res.data || [];
      console.log(`Dados originais: ${Array.isArray(data) ? data.length : 'dados não-array'} registros`);
      
      if (month && Array.isArray(data) && data.length > 0) {
        const targetYear = month.getFullYear();
        const targetMonth = month.getMonth() + 1; // 1-12
        const monthStr = `${targetYear}-${String(targetMonth).padStart(2, '0')}`; // "2025-05"
        
        console.log(`Aplicando filtro por mês: ${monthStr}`);
        
        data = data.filter(item => {
          // Definir campos de data relevantes por tipo de dado
          let dateFields = [];
          
          if (item.dataEntrada) dateFields.push(item.dataEntrada); // produtos
          if (item.dataHoraEntrada) dateFields.push(item.dataHoraEntrada); // registro_uso
          if (item.dataHoraSaida) dateFields.push(item.dataHoraSaida); // registro_uso
          if (item.dataHora) dateFields.push(item.dataHora); // alertas
          
          // Verificar se algum campo de data corresponde ao mês
          return dateFields.some(dateField => {
            if (!dateField) return false;
            const dateStr = String(dateField);
            return dateStr.includes(monthStr);
          });
        });
        
        console.log(`Após filtro: ${data.length} registros restantes`);
      }
      
      return data;
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 204) {
        return [];
      }
      return [];
    }
  }

  async function handleExportKey(key) {
    console.log(`Iniciando exportação para a chave: ${key}`);
  
    
    if (!endpoints[key]) {
        console.error(`Chave inválida: ${key}`);
        return;
    }

    if (!month) {
        toast.error("Por favor, selecione uma data antes de exportar o relatório.");
        return;
    }

    const data = await fetchJson(endpoints[key].fetchUrl);
    if (data.length === 0) {
        toast.error("Nenhum dado encontrado para exportar.");
        return;
    }

    console.log(`Exportando relatório: ${endpoints[key].label}`);
    const outName = `${endpoints[key].label.replace(/\s+/g, "_")}_${format(month, "yyyy-MM")}.xlsx`;

    try {
        // Usar a mesma formatação do relatório geral
        await createMultiSheetExcel([{
            table: endpoints[key].table,
            month: month.toISOString().slice(0, 7),
            label: endpoints[key].label
        }], outName);

        toast.success(`Relatório ${endpoints[key].label} exportado com sucesso!`);
    } catch (err) {
        console.error("Erro ao exportar o relatório", err);
        toast.error("Erro ao exportar o relatório. Verifique os logs para mais detalhes.");
    }
  }

  async function createMultiSheetExcel(tabelasComDados, outName) {
    const workbook = new ExcelJS.Workbook();

    const headerLabelMap = {
      produtos: {
        id: "Id",
        nome: "Nome",
        categoriaProduto: "Categoria do Produto",
        quantidade: "Quantidade",
        limiteSemanalDeUso: "Limite de Uso",
        dataValidade: "Data de Validade",
        dataEntrada: "Data de Entrada",
        creche: "Creche",
        relatorio: "Relatório"
      },
      registro_uso: {
        id: "Id",
        fk_produto: "Produto (FK)",
        quantidade: "Quantidade",
        dataHoraEntrada: "Data/Hora Entrada",
        dataHoraSaida: "Data/Hora Saída",
        funcionario: "Funcionário",
        observacao: "Observação"
      },
      alertas: {
        id: "Id",
        tipo: "Tipo",
        descricao: "Descrição",
        dataHora: "Data/Hora",
        nivel: "Nível",
        funcionario: "Funcionário"
      }
    };

    const prettify = (key) => {
      const s = key
        .replace(/_/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .toLowerCase()
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return s;
    };

    const isIsoDate = (v) => {
      return typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v);
    };

    const formatCategoria = (cat) => {
      if (!cat || typeof cat !== "string") return cat;
      const map = {
        vidros: "Vidros",
        chao: "Chão",
        multi_uso: "Multi Uso"
      };
      return map[cat.toLowerCase()] || cat.charAt(0).toUpperCase() + cat.slice(1);
    };
    
    for (const tabela of tabelasComDados) {
      try {
        console.log(`Buscando dados para sheet: ${tabela.label}`);
        
        const endpointKey = Object.keys(endpoints).find(key => endpoints[key].table === tabela.table);
        if (!endpointKey) {
          console.warn("Endpoint não encontrado para tabela:", tabela.table);
          continue;
        }
        const fetchUrl = endpoints[endpointKey].fetchUrl;
        const data = await fetchJson(fetchUrl);
        
        if (data && data.length > 0) {
          const worksheet = workbook.addWorksheet(tabela.label);
          
          const keys = Object.keys(data[0]);
          
          // Filtrar colunas desnecessárias
          const keysFiltered = keys.filter(k => !['relatorio', 'creche', 'produto'].includes(k.toLowerCase()));
          
          const labels = keysFiltered.map(k => (headerLabelMap[tabela.table] && headerLabelMap[tabela.table][k]) ? headerLabelMap[tabela.table][k] : prettify(k));
          
          worksheet.columns = keysFiltered.map((k, idx) => ({
            header: labels[idx],
            key: k,
            width: Math.min(Math.max(labels[idx].length + 6, 12), 60)
          }));
          
          data.forEach(item => {
            const rowObj = {};
            keysFiltered.forEach(k => {
              let value = item[k];
              if (value === null || value === undefined) {
                rowObj[k] = "";
                return;
              }
              if (isIsoDate(value)) {
                rowObj[k] = new Date(value);
                return;
              }
              if (k === "categoriaProduto") {
                rowObj[k] = formatCategoria(value);
                return;
              }
              if (typeof value === "object") {
                try { rowObj[k] = JSON.stringify(value); } catch { rowObj[k] = String(value); }
                return;
              }
              rowObj[k] = value;
            });
            worksheet.addRow(rowObj);
          });
          
          const headerRow = worksheet.getRow(1);
          headerRow.font = { bold: true, color: { argb: "FF0B3768" } };
          headerRow.alignment = { vertical: "middle", horizontal: "center" };
          headerRow.height = 22;
          headerRow.eachCell(cell => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFCCE7FF" }
            };
            cell.border = {
              top: { style: "thin", color: { argb: "FFDDDDDD" } },
              left: { style: "thin", color: { argb: "FFDDDDDD" } },
              bottom: { style: "thin", color: { argb: "FFDDDDDD" } },
              right: { style: "thin", color: { argb: "FFDDDDDD" } }
            };
          });
          
          worksheet.columns.forEach(col => {
            let maxLength = col.header ? col.header.toString().length : 12;
            col.eachCell({ includeEmpty: true }, cell => {
              const v = cell.value;
              let len = 0;
              if (v === null || v === undefined) len = 0;
              else if (v instanceof Date) len = 16;
              else len = v.toString().length;
              if (len > maxLength) maxLength = len;
            });
            col.width = Math.min(Math.max(maxLength + 4, 12), 60);
          });
          
          worksheet.columns.forEach(col => {
            if (/(data|date)/i.test(col.header) && !/(hora)/i.test(col.header)) {
              col.numFmt = "dd/mm/yyyy";
            } else if (/(data|date|hora)/i.test(col.header)) {
              col.numFmt = "dd/mm/yyyy hh:mm";
            }
          });
          
          console.log(`Sheet "${tabela.label}" criada com ${data.length} registros`);
        } else {
          console.log(`Nenhum dado retornado para ${tabela.label}`);
        }
      } catch (err) {
        console.error(`Erro ao criar sheet para ${tabela.label}:`, err);
      }
    }
    
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, outName.endsWith(".xlsx") ? outName : `${outName}.xlsx`);
  }

  async function handleExportAll() {
    if (!month) {
        toast.error("Por favor, selecione uma data antes de exportar o relatório geral.");
        return;
    }

    const outName = `Relatorio_Geral_${format(month, "yyyy-MM")}.xlsx`;

    try {
        console.log("Iniciando relatório geral para o mês:", month.toISOString().slice(0, 7));
        
        const tabelasComDados = [];
        
        for (const [, config] of Object.entries(endpoints)) {
            console.log(`Verificando dados para ${config.label}...`);
            
            try {
                // Tenta exportar individualmente para ver se tem dados para o mês (só verificação, sem download)
                const hasData = await tryBackendExport(config.table, `temp_${config.table}.xlsx`, true);
                
                if (hasData) {
                    console.log(`${config.label}: TEM dados para ${month.toISOString().slice(0, 7)}`);
                    tabelasComDados.push({
                        table: config.table,
                        month: month.toISOString().slice(0, 7),
                        label: config.label
                    });
                } else {
                    console.log(`${config.label}: NÃO tem dados para ${month.toISOString().slice(0, 7)}`);
                }
            } catch (err) {
                console.error(`${config.label}: Erro ao verificar dados -`, err);
            }
        }

        // Verificar se pelo menos uma tabela tem dados
        if (tabelasComDados.length === 0) {
            toast.error("Nenhum dado encontrado para exportar no relatório geral deste período.");
            return;
        }

        console.log(`Gerando relatório com ${tabelasComDados.length} tabela(s):`, 
                    tabelasComDados.map(t => t.label).join(", "));
          
        // Criar Excel com múltiplas abas no frontend
        await createMultiSheetExcel(tabelasComDados, outName);
        
        const tabelasIncluidas = tabelasComDados.map(t => t.label).join(", ");
        toast.success(`Relatório geral exportado! Tabelas Incluídas: ${tabelasIncluidas}`);
        
    } catch (err) {
        console.error("Erro capturado no relatório geral:", err);
        toast.error("Erro ao exportar o relatório geral: " + (err.message || "Erro desconhecido"));
    }
  }

  return (
    <div className="flex flex-col items-center gap-[1vh] h-[100vh] w-[100vw]">
      <AreaTittle texto ="Exportar Relatório"/>
      
      <div className="flex flex-row items-center gap-[1vw] border-[2px] border-[#3A577B] rounded-[1vw] p-[1vh]">
        <div className="cursor-pointer text-[3vh]">📅</div>
        <div className="flex items-center p-[1vw] outline-1 rounded-[1vw] text-[#dadada]">
          <DatePicker
            selected={month}
            onChange={(date) => setMonth(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            isClearable
            placeholderText={month ? format(month, "MMMM yyyy") : format(new Date(), "MMMM yyyy")}
             className="border-none outline-none text-center text-[1.7vh]"
            locale="pt-BR"
          />
        </div>

      </div>



      <div className="flex flex-row justify-center gap-[5vw] mt-[3vh] ml-[5vh] text-[#3A577B]">
        <div className="flex flex-col gap-[4vh]">
          <ExportInformationDiv titulo="Relatório Geral" onExport={handleExportAll} />
          <ExportInformationDiv titulo="Registros de Uso" onExport={() => handleExportKey("registros")} />
        </div>
        <div className="flex flex-col gap-[4vh]">
          <ExportInformationDiv titulo="Produtos" onExport={() => handleExportKey("produtos")} />
          <ExportInformationDiv titulo="Alertas" onExport={() => handleExportKey("alertas")} />
        </div>
      </div>

      {/* ToastContainer renderizado via portal para escapar do overflow-hidden */}
      {ReactDOM.createPortal(
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
          theme="colored"
          style={{ 
            zIndex: 999999,
            position: 'fixed',
            top: '20px',
            right: '20px'
          }}
        />,
        document.body
      )}
    </div>
  );
}

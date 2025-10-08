import React, { useState } from "react";
import { ExportInformationDiv } from "../Moleculas/ExportInformationDiv";
import axios from "axios";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
registerLocale("pt-BR", ptBR);

export function AreaWorkExportar() {
  const [month, setMonth] = useState(new Date());

  const API_BASE = "http://localhost:8080/api";
  const endpoints = {
    produtos: { table: "produtos", label: "Produtos", fetchUrl: `${API_BASE}/produtos` },
    registros: { table: "registro_uso", label: "Registros de Uso", fetchUrl: `${API_BASE}/registroUso` },
    alertas: { table: "alertas", label: "Alertas", fetchUrl: `${API_BASE}/historicoAlertas` },
  };

  async function tryBackendExport(tableName, outName) {
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

      const res = await axios.post(`${API_BASE}/export/excel`, payload, {
        responseType: "arraybuffer",
        headers,
      });

      if (res.status !== 200) {
        console.error("Backend export failed with status:", res.status);
        return false;
      }

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, outName.endsWith(".xlsx") ? outName : `${outName}.xlsx`);
      return true;
    } catch (err) {
      console.warn("Backend export failed, falling back to client generation", err?.message || err);
      return false;
    }
  }

  async function fetchJson(url) {
    try {
      const token = sessionStorage.getItem("authToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const params = {};
      if (month) params.month = month.toISOString().slice(0, 7);
      const res = await axios.get(url, { params, headers });

      if (res.status !== 200) {
        console.error("Failed to fetch data with status:", res.status);
        return [];
      }
      if(month === null){
        toast.error("Exportando dados sem filtro de mês");
        return
      }

      return res.data;
    } catch (err) {
      console.error("Error fetching data:", err);
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
    const outName = `${endpoints[key].label.replace(/\s+/g, "_")}${month ? `_${format(month, "yyyy-MM")}` : ""}`;

    try {
        const ok = await tryBackendExport(endpoints[key].table, outName + ".xlsx");

        if (!ok) {
            toast.error("Erro ao exportar o relatório. Nenhum dado encontrado.");
            return;
        }

        toast.success(`Relatório ${endpoints[key].label} exportado com sucesso!`);
    } catch (err) {
        console.error("Erro ao exportar o relatório", err);
        toast.error("Erro ao exportar o relatório. Verifique os logs para mais detalhes.");
    }
  }

  async function handleExportAll() {
    if (!month) {
        toast.error("Por favor, selecione uma data antes de exportar o relatório geral.");
        return;
    }

    const outName = `Relatorios_Todos_${format(month, "yyyy-MM")}.xlsx`;

    try {
        const res = await axios.get(`${API_BASE}/export/consolidated`, {
            params: { month: month.toISOString().slice(0, 7) },
            headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` },
        });

        if (res.status === 204) {
            toast.error("Nenhum dado encontrado para exportar no relatório geral.");
            return;
        }

        const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, outName);
        toast.success("Relatório geral exportado com sucesso!");
    } catch (err) {
        console.error("Erro ao exportar o relatório geral", err);
        toast.error("Erro ao exportar o relatório geral. Verifique os logs para mais detalhes.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-[1vh] h-[85vh] w-[100vw] mt-[1vh]">
      <div className="flex flex-row items-center gap-[1vw]">
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
    </div>
  );
}

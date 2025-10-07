import React, { useState } from "react";
import { ExportInformationDiv } from "../Moleculas/ExportInformationDiv";
import axios from "axios";
import { exportarExcel, exportarExcelMulti } from "../../Hooks/exportarExcel";
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
  const [month, setMonth] = useState(null);

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

    console.log(`Exportando relatório: ${endpoints[key].label}`);
    const outName = `${endpoints[key].label.replace(/\s+/g, "_")}${month ? `_${format(month, "yyyy-MM")}` : ""}`;

    const ok = await tryBackendExport(endpoints[key].table, outName + ".xlsx");

    if (!ok) {
        try {
            const data = await fetchJson(endpoints[key].fetchUrl);
            const titles = data.length > 0 ? Object.keys(data[0]) : [];
            const campos = titles;
            await exportarExcel(data, titles, outName, campos);
        } catch (err) {
            console.error("Client-side export failed", err);
            toast.error("Erro ao exportar o relatório");
        }
    }

    toast.success(`Relatório ${endpoints[key].label} exportado com sucesso!`);
  }

  async function handleExportAll() {
    if (!month) {
        toast.error("Por favor, selecione uma data antes de exportar o relatório geral.");
        return;
    }

    const outName = `Relatorios_Todos_${format(month, "yyyy-MM")}.xlsx`;
    const ok = await tryBackendExport("all", outName);

    if (!ok) {
      try {
        const keys = Object.keys(endpoints);
        const tabelas = [];

        for (const k of keys) {
          const data = await fetchJson(endpoints[k].fetchUrl);
          const titles = data.length > 0 ? Object.keys(data[0]) : [];
          const campos = titles;
          tabelas.push({ nome: endpoints[k].label, dados: data, titles, campos });
        }

        await exportarExcelMulti(tabelas, outName);
      } catch (err) {
        console.error("Client-side multi export failed", err);
      }
    }

    toast.success("Relatório Geral exportado com sucesso!");
  }

  return (
    <div className="flex flex-col items-center gap-[1vh] h-[85vh] w-[100vw] mt-[1vh]">
      <div className="flex flex-row items-center">
        
        <div className="flex items-center p-[1vw]">
        <div className="cursor-pointer text-[3vh]">📅</div>
          <DatePicker
            selected={month}
            onChange={(date) => setMonth(date)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            isClearable
            placeholderText="Selecione o mês"
            className="border-none outline-none text-center text-[2vh]"
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

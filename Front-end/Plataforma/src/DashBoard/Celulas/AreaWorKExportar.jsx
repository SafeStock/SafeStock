import React, { useState } from "react";
import { ExportInformationDiv } from "../Moleculas/ExportInformationDiv";
import axios from "axios";
import { exportarExcel, exportarExcelMulti } from "../../Hooks/exportarExcel";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
registerLocale("pt-BR", ptBR);

export function AreaWorkExportar() {
  const [loading, setLoading] = useState(false);
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
    const token = sessionStorage.getItem("authToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const params = {};
    if (month) params.month = month.toISOString().slice(0, 7);
    const res = await axios.get(url, { params, headers });
    return res.data;
  }

  async function handleExportKey(key) {
    if (!endpoints[key]) return;
    setLoading(true);

    const meta = endpoints[key];
    const outName = `${meta.label.replace(/\s+/g, "_")}_${month ? format(month, "yyyy-MM") : "all"}`;

    const ok = await tryBackendExport(meta.table, outName + ".xlsx");

    if (!ok) {
      try {
        const data = await fetchJson(meta.fetchUrl);
        const titles = data.length > 0 ? Object.keys(data[0]) : [];
        const campos = titles;
        await exportarExcel(data, titles, outName, campos);
      } catch (err) {
        console.error("Client-side export failed", err);
      }
    }

    setLoading(false);
  }

  async function handleExportAll() {
    setLoading(true);
    const ok = await tryBackendExport(
      "all",
      `Relatorios_Todos_${month ? format(month, "yyyy-MM") : "all"}.xlsx`
    );

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

        await exportarExcelMulti(tabelas, `Relatorios_Todos_${month ? format(month, "yyyy-MM") : "all"}`);
      } catch (err) {
        console.error("Client-side multi export failed", err);
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center gap-[1vh] h-[85vh] w-[100vw] text-[#3A577B] mt-[1vh]">
      <div className="flex items-center border-[0.2vh] rounded-[2vh] p-[1vw]">
        <div>📅</div>
        <DatePicker
          selected={month}
          onChange={(date) => setMonth(date)}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          isClearable
          placeholderText="Selecione o mês"
          className="border-none outline-none"
          locale="pt-BR"
        />
      </div>

      <div className="flex flex-row justify-center gap-[5vw] mt-[3vh] ml-[5vh]">
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

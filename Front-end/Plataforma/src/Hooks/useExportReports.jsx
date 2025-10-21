import axios from "axios";

const BASE = "/api";

async function safeGet(url) {
  try {
    const res = await axios.get(url);
    if (res.status === 204) return [];
    return res.data || [];
  } catch (err) {
    console.error("useExportReports: fetch error", url, err?.message || err);
    return [];
  }
}

function filterByMonth(list, month) {
  if (!month) return list;
  return (list || []).filter((item) => JSON.stringify(item).includes(month));
}

export async function getProdutos(month) {
  const data = await safeGet(`${BASE}/produtos`);
  return filterByMonth(data, month);
}

export async function getFuncionarios(month) {
  const data = await safeGet(`${BASE}/funcionarios`);
  return filterByMonth(data, month);
}

export async function getRegistroUso(month) {
  const data = await safeGet(`${BASE}/registroUso`);
  return filterByMonth(data, month);
}

export async function getCreche(month) {
  const data = await safeGet(`${BASE}/creches`);
  return filterByMonth(data, month);
}

export async function getHistoricoAlertas(month) {
  const data = await safeGet(`${BASE}/historicoAlertas`);
  return filterByMonth(data, month);
}

export default {
  getProdutos,
  getFuncionarios,
  getRegistroUso,
  getCreche,
  getHistoricoAlertas,
};

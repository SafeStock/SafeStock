import { Routes, Route } from 'react-router-dom';
import { Login } from "../onboarding/Login";
import { Cadastro } from '../DashBoard/Cadastro';
import { useSetAba } from './setAba';
import { TelaFuncionarios } from '../DashBoard/TelaFuncionarios';
import { DashPrincipalDono } from '../DashBoard/DashPrincipalDono';
import { HistoricoAlertas } from '../DashBoard/HistoricoAlertas';
import { HistoricoUso } from '../DashBoard/HistoricoUso';
import { DashLimpeza } from '../DashBoard/DashLimpeza';	
import { PrivateRoute } from '../components/PrivateRoute'; // ajuste o caminho se necessário

export function RotasApp() {
  useSetAba();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/" element={<DashPrincipalDono />} />
        <Route path="/dashboard/cadastro" element={<Cadastro />} />
        <Route path="/dashboard/telafuncionarios" element={<TelaFuncionarios />} />
        <Route path="/dashboard/dashboardlimpeza" element={<DashLimpeza />} />
        <Route path="/dashboard/historicoalertas" element={<HistoricoAlertas />} />
        <Route path="/dashboard/historicouso" element={<HistoricoUso />} />
      </Route>
    </Routes>
  );
}
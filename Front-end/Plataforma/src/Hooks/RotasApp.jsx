import { Routes, Route } from 'react-router-dom';
import { Login } from "../onboarding/Login";
import { Cadastro } from '../DashBoard/Cadastro';
import { useSetAba } from './setAba';
import { TelaFuncionarios } from '../DashBoard/TelaFuncionarios';
import { DashPrincipalDono } from '../DashBoard/DashPrincipalDono';
import { HistoricoAlertas } from '../DashBoard/HistoricoAlertas';
import { HistoricoUso } from '../DashBoard/HistoricoUso';



export function RotasApp() {
  useSetAba(); 

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashBoard/TelaFuncionarios" element={<TelaFuncionarios/>} />
      <Route path="/dashBoard/HistoricoAlertas" element={<HistoricoAlertas/>} />
      <Route path="/dashBoard/HistoricoUso" element={<HistoricoUso/>} />
      <Route path="/dashBoard/" element={<DashPrincipalDono/>} />
    </Routes>
  );
}

import { Routes, Route } from 'react-router-dom';
import { Login } from "../onboarding/Login";
import { Cadastro } from "../onboarding/Cadastro";
import { useSetAba } from './setAba';
import { TelaFuncionarios } from '../DashBoard/TelaFuncionarios';
import { DashPrincipalDono } from '../DashBoard/DashPrincipalDono';



export function RotasApp() {
  useSetAba(); 

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashBoard/TelaFuncionarios" element={<TelaFuncionarios/>} />
      <Route path="/dashBoard/" element={<DashPrincipalDono/>} />
    </Routes>
  );
}

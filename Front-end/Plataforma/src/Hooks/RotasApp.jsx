import { Routes, Route } from 'react-router-dom';
import { Login } from "../onboarding/Login";
import { Cadastro } from "../onboarding/Cadastro";
import { useSetAba } from './setAba';
import { TelaFuncionarios } from '../DashBoard/TelaFuncionarios';

export function RotasApp() {
  useSetAba(); 

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashBoard/TelaFuncionarios" element={<TelaFuncionarios/>} />
    </Routes>
  );
}

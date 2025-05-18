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
import { CadastroProdutosEtapa1 } from '../DashBoard/CadastroProdutosEtapa1';
import { CadastroProdutosEtapa2 } from '../DashBoard/CadastroProdutoEtapa2';
import { useState } from 'react';
import { RegistroUso } from '../DashBoard/RegistroUso';

export function RotasApp() {
  useSetAba();

   const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    quantidade: '',
    limiteDeUso: '',
    dataValidade: '',
    dataEntrada: ''
  });

  const [formRegistroUso, setFormRegistroUso] = useState({
    nome: '',
    quantidade: '',
    dataValidade: '',
    dataRetirada: ''
  });

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      
      <Route element={<PrivateRoute allowedRoles={["dono"]} />}>
        <Route path="/dashboard/cadastro" element={<Cadastro />} />
        <Route path="/dashboard/historicoalertas" element={<HistoricoAlertas />} />
        <Route path="/dashboard/historicouso" element={<HistoricoUso />} />
        <Route path="/dashboard/" element={<DashPrincipalDono />} />
        <Route path="/dashboard/telafuncionarios" element={<TelaFuncionarios />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["administracao"]} />}>
        <Route path="/dashboard/" element={<DashPrincipalDono />} />
        <Route path="/dashboard/telafuncionarios" element={<TelaFuncionarios />} />
        <Route path="/dashboard/historicoalertas" element={<HistoricoAlertas />} />
        <Route path="/dashboard/historicouso" element={<HistoricoUso />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["limpeza"]} />}>
        <Route path="/dashboard/dashboardlimpeza" element={<DashLimpeza />} />
        <Route path="/dashboard/historicouso" element={<HistoricoUso />} />
        <Route path="/dashboard/historicoalertas" element={<HistoricoAlertas />} />
        <Route path="/cadastroProduto1" element={<CadastroProdutosEtapa1 formData={formData} setFormData={setFormData} titulo="Cadastro Produto" />} />
        <Route path="/cadastroProduto2" element={<CadastroProdutosEtapa2 formData={formData} setFormData={setFormData} titulo="Cadastro Produto"/>} />
        <Route path="/editarProduto1" element={<CadastroProdutosEtapa1 formData={formData} setFormData={setFormData} titulo="Editar Produto"/>} />
        <Route path="/editarProduto2" element={<CadastroProdutosEtapa2 formData={formData} setFormData={setFormData} titulo="Editar Prodduto"/>} />
        <Route path="/registroUso" element={<RegistroUso formRegistroUso={formRegistroUso} setFormRegistroUso={setFormRegistroUso}/>} />

        <Route path="/produtos" element={<DashPrincipalDono />} />

        
      </Route>

    </Routes>
  );
}
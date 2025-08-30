import { Routes, Route } from 'react-router-dom';
import { Login } from "../onboarding/Login";
import { useSetAba } from './setAba';
import { TelaFuncionarios } from '../DashBoard/TelaFuncionarios';
import { TelaProdutos } from '../DashBoard/TelaProdutos';
import { DashPrincipalDono } from '../DashBoard/DashPrincipalDono';
import { HistoricoAlertas } from '../DashBoard/HistoricoAlertas';
import { HistoricoUso } from '../DashBoard/HistoricoUso';
import { DashLimpeza } from '../DashBoard/DashLimpeza';
import { PrivateRoute } from '../components/PrivateRoute';
import { DonoLayout } from "../DashBoard/Celulas/DonoLayout";
import { AdminLayout } from "../DashBoard/Celulas/AdminLayout";
import { LimpezaLayout } from "../DashBoard/Celulas/LimpezaLayout";
import {CadastroUso} from '../DashBoard/CadastroUso';
import { Cadastro} from '../DashBoard/Cadastro';
import { CadastroProduto } from '../DashBoard/CadastroProduto';

export function RotasApp() {
  useSetAba();

  return (

    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute allowedRoles={["dono"]} />}>
        <Route path="/dashboard" element={<DonoLayout />}>
          <Route index element={<DashPrincipalDono />} />
          <Route path="telafuncionarios" element={<TelaFuncionarios />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="telaprodutos" element={<TelaProdutos />} />
          <Route path="historicoalertas" element={<HistoricoAlertas />} />
          <Route path="historicouso" element={<HistoricoUso />} />
        </Route>
      </Route>


      <Route element={<PrivateRoute allowedRoles={["administracao"]} />}>
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<DashPrincipalDono />} />
          <Route path="cadastro" element={<Cadastro />} />
          <Route path="telafuncionarios" element={<TelaFuncionarios />} />
          <Route path="historicoalertas" element={<HistoricoAlertas />} />
          <Route path="historicouso" element={<HistoricoUso />} />
          <Route path="telaprodutos" element={<TelaProdutos />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute allowedRoles={["limpeza"]} />}>
        <Route path="/" element={<LimpezaLayout />}>
          <Route index element={<DashLimpeza />} />
          <Route path="cadastrouso" element={<CadastroUso />} />
          <Route path="cadastroproduto" element={<CadastroProduto />} />
          <Route path="dashboardlimpeza" element={<DashLimpeza />} />
          <Route path="historicoalertas" element={<HistoricoAlertas />} />
          <Route path="historicouso" element={<HistoricoUso />} />
          <Route path="telaprodutos" element={<TelaProdutos />} />


        </Route>
      </Route>

    </Routes >
  )
}


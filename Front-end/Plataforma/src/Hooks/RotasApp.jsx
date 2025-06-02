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
import { Formulario } from '../DashBoard/Formulario';
import { Cadastro} from '../DashBoard/Cadastro';

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
        <Route path="/dashboard" element={<LimpezaLayout />}>
          <Route path="dashboardlimpeza" element={<DashLimpeza />} />
          <Route path="historicoalertas" element={<HistoricoAlertas />} />
          <Route path="historicouso" element={<HistoricoUso />} />
          <Route path="telaprodutos" element={<TelaProdutos />} />


          {/* Rota para registro de uso */}
          <Route path="/dashboard/registrouso" element={<Formulario
            titulo="Registro de uso"
            campos={[
              { name: "nome", label: "Nome:", placeholder: "Digite o nome do produto" },
              { name: "quantidade", label: "Quantidade:", placeholder: "Digite a quantidade de produtos" },
              { name: "dataValidade", label: "Data de validade:", placeholder: "Digite a data de validade (ex: 08/27)" },
              { name: "dataRetirada", label: "Data de retirada:", placeholder: "Digite a data de retirada (ex: 08/27)" }
            ]}
            onSubmit={(dados) => console.log(dados)}
          />} />


          {/* Rota para cadastro de produto parte 1*/}
          <Route path="/dashboard/cadastroProdutos" element={<Formulario
            titulo="Cadastro de produto"
            campos={[
              { name: "nome", label: "Nome:", placeholder: "Digite o nome do produto" },
              { name: "categoria", label: "Categoria:", placeholder: "Digite a categoria do produto" },
              { name: "quantidade", label: "Quantidade:", placeholder: "Digite a quantidade de produtos" },

            ]}
            onSubmit={(dados) => console.log(dados)}
            navigateTo="/dashboard/cadastroProdutos2"
            buttonLabel="Próximo"
          />} />


          {/* Rota para cadastro de produto parte 2*/}
          <Route path="/dashboard/cadastroProdutos2" element={<Formulario
            titulo="Cadastro de produto"
            campos={[
              { name: "limiteDeUso", label: "Limite de uso:", placeholder: "Digite o limite de uso semanal" },
              { name: "dataValidade", label: "Data de validade:", placeholder: "Digite a data de validade (ex: 08/27)" },
              { name: "dataEntrada", label: "Data de entrada:", placeholder: "Digite a data de entrada (ex: 08/27)" },

            ]}
            onSubmit={(dados) => console.log(dados)}
            navigateTo="/dashboard"
            buttonLabel="Enviar"
          />} />


          {/* Rota para editar cadastro de produto parte 1*/}
          <Route path="/dashboard/editarCadastroProdutos" element={<Formulario
            titulo="Editar produtos"
            campos={[
              { name: "nome", label: "Nome:", placeholder: "Digite o nome do produto" },
              { name: "categoria", label: "Categoria:", placeholder: "Digite a categoria do produto" },
              { name: "quantidade", label: "Quantidade:", placeholder: "Digite a quantidade de produtos" },

            ]}
            onSubmit={(dados) => console.log(dados)}
            navigateTo="/dashboard/cadastroProdutos2"
            buttonLabel="Próximo"
          />} />


          {/* Rota para editar cadastro de produto parte 2*/}
          <Route path="/dashboard/editarCadastroProdutos2" element={<Formulario
            titulo="Editar produtos"
            campos={[
              { name: "limiteDeUso", label: "Limite de uso:", placeholder: "Digite o limite de uso semanal" },
              { name: "dataValidade", label: "Data de validade:", placeholder: "Digite a data de validade (ex: 08/27)" },
              { name: "dataEntrada", label: "Data de entrada:", placeholder: "Digite a data de entrada (ex: 08/27)" },

            ]}
            onSubmit={(dados) => console.log(dados)}
            navigateTo="/dashboard"
            buttonLabel="Enviar"
          />} />

        </Route>
      </Route>

    </Routes >
  )
}


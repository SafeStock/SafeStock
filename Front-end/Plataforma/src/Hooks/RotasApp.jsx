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
import { Formulario } from '../DashBoard/Formulario';

export function RotasApp() {
  useSetAba();


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
        <Route path="/produtos" element={<DashPrincipalDono />} />


        {/* Rota para registro de uso */}
        <Route path="/Dashboard/registrouso" element={<Formulario
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
        <Route path="/Dashboard/cadastroProdutos" element={<Formulario
          titulo="Cadastro de produto"
          campos={[
            { name: "nome", label: "Nome:", placeholder: "Digite o nome do produto" },
            { name: "categoria", label: "Categoria:", placeholder: "Digite a categoria do produto" },
            { name: "quantidade", label: "Quantidade:", placeholder: "Digite a quantidade de produtos" },

          ]}
          onSubmit={(dados) => console.log(dados)}
          navigateTo="/Dashboard/cadastroProdutos2"
          buttonLabel="Próximo"
        />} />


        {/* Rota para cadastro de produto parte 2*/}
        <Route path="/Dashboard/cadastroProdutos2" element={<Formulario
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
        <Route path="/Dashboard/editarCadastroProdutos" element={<Formulario
          titulo="Editar produtos"
          campos={[
            { name: "nome", label: "Nome:", placeholder: "Digite o nome do produto" },
            { name: "categoria", label: "Categoria:", placeholder: "Digite a categoria do produto" },
            { name: "quantidade", label: "Quantidade:", placeholder: "Digite a quantidade de produtos" },

          ]}
          onSubmit={(dados) => console.log(dados)}
          navigateTo="/Dashboard/cadastroProdutos2"
          buttonLabel="Próximo"
        />} />


        {/* Rota para editar cadastro de produto parte 2*/}
        <Route path="/Dashboard/editarCadastroProdutos2" element={<Formulario
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

        {/* Rota para editar funcionário parte 1*/}
        <Route path="/Dashboard/editarFuncionário" element={<Formulario
          titulo="Editar Funcionário"
          campos={[
            { name: "nome", label: "Nome:", placeholder: "Digite o nome do funcionário" },
            { name: "sobrenome", label: "Sobrenome:", placeholder: "Digite o sobrenome do funcionário" },
            { name: "cargo", label: "Cargo:", placeholder: "Digite o cargo do funcionário)" },

          ]}
          onSubmit={(dados) => console.log(dados)}
          navigateTo="/Dashboard/editarFuncionário2"
          buttonLabel="Próximo"
        />} />

        {/* Rota para editar funcionário parte 2*/}
        <Route path="/Dashboard/editarFuncionário2" element={<Formulario
          titulo="Editar Funcionário"
          campos={[
            { name: "email", label: "Email:", placeholder: "Digite o email do funcionário" },
            { name: "senha", label: "Senha:", placeholder: "Digite a senha" },
            { name: "telefone", label: "Telefone:", placeholder: "Digite o telefone do funcionário)" },

          ]}
          onSubmit={(dados) => console.log(dados)}
          navigateTo="/dashboard"
          buttonLabel="Enviar"
        />} />

      </Route>

    </Routes>
  );
}
import { BtnRedirecNavBar } from "../Atomos/BtnRedirecNavBar";
import { DivisionNavBar } from "../Atomos/DivisionNavBar";
import { Logo } from "../Atomos/Logo";
import { useNavigate } from 'react-router-dom';
import { useSetAba } from "../../Hooks/setAba";


export function NavBar() {

  const useAba = useSetAba();

  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
    useAba;
  };



  let display1 = 'flex';
  let dashboard = '';
  if (sessionStorage.getItem('cargo') === 'limpeza') {
    display1 = 'none';
    dashboard = '/dashboardlimpeza';
  }

  return (
    <div className="flex bg-[#3A577B] w-[4.6vw] h-[92.7vh] rounded-[1vw] shadow-[0px_5px_10px_rgba(0,0,0,0.8)] items-center gap-[3vh] flex-col">
      <DivisionNavBar />

      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/dashboard.svg" onClick={() => handleRedirect(`${dashboard}`)} title="Dashboard" />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/funcionarios.svg" onClick={() => handleRedirect('/dashboard/telafuncionarios')} title="Funcionários" display={display1}/>
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/produtos.svg" onClick={() => handleRedirect('/dashboard/telaprodutos')} title="Produtos"/>
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/historicoUso.svg" onClick={() => handleRedirect('/dashboard/historicouso')} title="Histórico de Uso" />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/historicoAlertas.svg" onClick={() => handleRedirect('/dashboard/historicoalertas')} title="Histórico de Alertas" />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/logout.svg" onClick={() => { sessionStorage.clear(); handleRedirect('/login'); }} title="Sair" />

      <Logo />
    </div>
  );
}

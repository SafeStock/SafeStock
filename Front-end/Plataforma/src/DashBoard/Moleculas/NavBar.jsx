import { BtnRedirecNavBar } from "../Atomos/BtnRedirecNavBar";
import { DivisionNavBar } from "../Atomos/DivisionNavBar";
import { Logo } from "../Atomos/Logo";
import { useNavigate } from 'react-router-dom';
import { useSetAba } from "../../Hooks/setAba";
import { useLocation } from "react-router-dom";

// Importar imagens corretamente para o build do Vite
import dashboardIcon from '../../assets/icones-sidebar/dashboard.svg';
import funcionariosIcon from '../../assets/icones-sidebar/funcionarios.svg';
import produtosIcon from '../../assets/icones-sidebar/produtos.svg';
import historicoUsoIcon from '../../assets/icones-sidebar/historicoUso.svg';
import historicoAlertasIcon from '../../assets/icones-sidebar/historicoAlertas.svg';
import exportIcon from '../../assets/exportIcon.svg';
import logoutIcon from '../../assets/icones-sidebar/logout.svg';


export function NavBar() {

  const useAba = useSetAba();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirect = (path) => {
    navigate(path);
    useAba;
  };

  let display1 = 'flex';
  let dashboard = '/dashboard';
  if (sessionStorage.getItem('cargo') === 'limpeza') {
    display1 = 'none';
    dashboard = '/dashboardlimpeza';
  }

  return (
    <div className="flex bg-[#3A577B] w-[4.6vw] h-[92.7vh] rounded-[1vw] shadow-[0px_5px_10px_rgba(0,0,0,0.8)] items-center gap-[1vh] flex-col">
      <DivisionNavBar />
      <BtnRedirecNavBar
        imagemUrl={dashboardIcon}
        onClick={() => handleRedirect(`${dashboard}`)}
        title="Dashboard"
        ativado={location.pathname === "/dashboard"}
      />

      <BtnRedirecNavBar
        imagemUrl={funcionariosIcon}
        onClick={() => handleRedirect('telafuncionarios')}
        title="Funcionários"
        display={display1}
        ativado={location.pathname === "/telafuncionarios"}
      />

      <BtnRedirecNavBar
        imagemUrl={produtosIcon}
        onClick={() => handleRedirect('telaprodutos')}
        title="Produtos"
        ativado={location.pathname === "/telaprodutos"}
      />

      <BtnRedirecNavBar
        imagemUrl={historicoUsoIcon}
        onClick={() => handleRedirect('historicouso')}
        title="Histórico de Uso"
        ativado={location.pathname === "/historicouso"}
      />

      <BtnRedirecNavBar
        imagemUrl={historicoAlertasIcon}
        onClick={() => handleRedirect('historicoalertas')}
        title="Histórico de Alertas"
        ativado={location.pathname === "/historicoalertas"}
      />

      <BtnRedirecNavBar
        display={display1}
        imagemUrl={exportIcon}
        onClick={() => handleRedirect('/exportarrelatorio ')}
        title="Exportar Relatório"
        ativado={location.pathname === "/exportarrelatorio"}
      />

      <BtnRedirecNavBar imagemUrl={logoutIcon} onClick={() => { sessionStorage.clear(); handleRedirect('/login'); }} title="Sair" />

      <Logo />
    </div>
  );
}

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

  return (
    <div className="flex bg-[#3A577B] w-[5.3vw] h-[90vh] rounded-[1vw] shadow-[0px_5px_10px_rgba(0,0,0,0.8)] items-center gap-[3vh] flex-col">
      <DivisionNavBar/>

      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/dashboard.svg" onClick={() => handleRedirect('/dashboard')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/funcionarios.svg" onClick={() => handleRedirect('telafuncionarios')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/produtos.svg" onClick={() => handleRedirect('telaprodutos')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/historicoUso.svg" onClick={() => handleRedirect('historicouso')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/exportarRelatorio.svg" onClick={() => handleRedirect('dashboardlimpeza')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/historicoAlertas.svg" onClick={() => handleRedirect('historicoalertas')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/icones-sidebar/logout.svg" onClick={() => {sessionStorage.clear(); handleRedirect('/login');
  }} 
/>
      

      <Logo/>
    </div>
  );
}

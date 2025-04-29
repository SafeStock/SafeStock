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

      <BtnRedirecNavBar imagemUrl="/src/assets/Home.svg" onClick={() => handleRedirect('/dashboard')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/Home.svg" onClick={() => handleRedirect('/dashboard/dashboardlimpeza')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/Blocks.svg" onClick={() => handleRedirect('/blocks')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/DocEscala.svg" onClick={() => handleRedirect('/doc')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/AddNewUser.svg" onClick={() => handleRedirect('/dashboard/cadastro')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/UsersGroup.svg" onClick={() => handleRedirect('/dashboard/telafuncionarios')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/Box.svg" onClick={() => handleRedirect('/dashboard/historicouso')} />
      <BtnRedirecNavBar imagemUrl="/src/assets/Attencion.svg" onClick={() => handleRedirect('/dashboard/historicoalertas')} />

      <Logo/>
    </div>
  );
}

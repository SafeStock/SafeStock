import { BtnRedirecNavBar } from "../Atomos/BtnRedirecNavBar";
import { DivisionNavBar } from "../Atomos/DivisionNavBar";

export function NavBar() {
  return (
    <div className="flex bg-[#3A577B] w-[5vw] h-[90vh] rounded-[1vw] shadow-[0px_5px_10px_rgba(0,0,0,0.8)] items-center gap-[3vh] flex-col">
      <DivisionNavBar/>
      <BtnRedirecNavBar imagemUrl="/src/assets/Home.svg"/>
      <BtnRedirecNavBar imagemUrl="/src/assets/Blocks.svg"/>
      <BtnRedirecNavBar imagemUrl="/src/assets/DocEscala.svg"/>
      <BtnRedirecNavBar imagemUrl="/src/assets/AddNewUser.svg"/>
      <BtnRedirecNavBar imagemUrl="/src/assets/UsersGroup.svg"/>
      <BtnRedirecNavBar imagemUrl="/src/assets/Box.svg"/>
      <BtnRedirecNavBar imagemUrl="/src/assets/Attencion.svg"/>
    </div>
  );
}
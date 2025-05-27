import { AreaSubTitle } from "../Moleculas/AreaSubTitle";
import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWork({ titles , abrirModal, tabela, campos }) {
  return (
    <div className="flex flex-col items-center h-[85vh] w-full ">
      <AreaSubTitle titles={titles} />
      <div className="ml-[9vw] h-[70vh] w-[90vw] flex flex-col items-center justify-center">
        <UserInformation abrirModal={abrirModal} tabela={tabela} campos={campos}/>
      </div>
    </div>
    
  );
}

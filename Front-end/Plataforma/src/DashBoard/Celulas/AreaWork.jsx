import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWork({ abrirModal, tabela, campos, titles }) {
  return (
    <div className="flex flex-col items-center h-[85vh] w-full ">
      <div className="ml-[7vw] h-[60vh] w-[90vw] flex flex-col items-center justify-center">
        <UserInformation abrirModal={abrirModal} tabela={tabela} campos={campos} titles={titles} />
      </div>
    </div>
    
  );
}

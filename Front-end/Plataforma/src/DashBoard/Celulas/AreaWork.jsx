import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWork({ abrirModal, tabela, campos, titles }) {
  return (
    <div className=" ml-[7vw] h-[68vh] w-[90vw] ">
      <div className="h-[67vh] w-[90vw] flex flex-col items-center justify-start">
        <UserInformation abrirModal={abrirModal} tabela={tabela} campos={campos} titles={titles} />
      </div>
    </div>
    
  );
}

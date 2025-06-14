import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWork({ abrirModal, tabela, campos, titles, mostrarBotaoExportar }) {
  return (
    <div className=" ml-[6vw] h-[68vh] w-[90vw] ">
      <div className="h-[67vh] w-[90vw] flex flex-col items-center justify-start">
        <UserInformation abrirModal={abrirModal} tabela={tabela} campos={campos} titles={titles} mostrarBotaoExportar={mostrarBotaoExportar}/>
      </div>
    </div>
    
  );
}

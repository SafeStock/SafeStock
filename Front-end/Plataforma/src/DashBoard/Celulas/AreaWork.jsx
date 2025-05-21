import { AreaSubTitle } from "../Moleculas/AreaSubTitle";
import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWork({ titles , abrirModal}) {
  return (
    <div className="flex flex-col flex-1 items-center h-[85vh] w-full ">
      <AreaSubTitle titles={titles} />
      <div className="ml-[7vw] h-[70vh] w-[85vw] flex flex-col items-center justify-center bg-[white]">
        <UserInformation abrirModal={abrirModal}/>
      </div>
    </div>
    
  );
}

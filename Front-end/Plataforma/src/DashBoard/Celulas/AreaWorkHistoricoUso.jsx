import { AreaSubTitle } from "../Moleculas/AreaSubTitle";
import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWorkHistoricoUso({displayHistoricoUso}) {
    return (
    <div className="none items-center" style={{display: displayHistoricoUso, flexDirection: 'column'}}>
      <AreaSubTitle title1="Nome" title2="Sobrenome" title3="Cargo" title4="Email" title5="Telefone" />
      <div className="mt-[3vh] h-[65vh] w-[75vw] flex flex-col items-center justify-center
      overflow-y-auto rounded-[20px] 
      shadow-[0_0_5px_rgba(0,0,0,0.7)] bg-[white]">
        <UserInformation />
      </div>
      </div>
    );
  }
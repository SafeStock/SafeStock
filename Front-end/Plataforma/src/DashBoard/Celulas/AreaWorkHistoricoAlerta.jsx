import { AreaSubTitle } from "../Moleculas/AreaSubTitle";
import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWorkHistoricoAlerta({displayHistoricoAlerta}) {
    return (
    <div className="none items-center" style={{display: displayHistoricoAlerta, flexDirection: 'column'}}>
      <AreaSubTitle title1="Alerta" title2="Status" title3="Data e Hora" />
      <div className="mt-[3vh] h-[65vh] w-[75vw] flex flex-col items-center justify-center
      overflow-y-auto rounded-[20px] 
      shadow-[0_0_5px_rgba(0,0,0,0.7)] bg-[white]">
        <UserInformation />
      </div>
      </div>
    );
  }
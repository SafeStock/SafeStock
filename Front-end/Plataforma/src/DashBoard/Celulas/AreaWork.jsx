import { AreaSubTitle } from "../Moleculas/AreaSubTitle";
import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWork({ displayFuncionarios = "none", displayHistoricoAlerta = "none", displayHistoricoUso = "none", abrirModal }) {
      
  return (
    <div className="none items-center flex-col" style={{ display: displayFuncionarios, displayHistoricoAlerta, displayHistoricoUso }}>
      <AreaSubTitle title1="Nome" title2="Cargo" title3="Email" title4="Telefone" />
      
      <div className="mt-[3vh] h-[65vh] w-[90vw] flex flex-col items-center justify-center
        overflow-y-auto rounded-[20px] ">
        
        <UserInformation abrirModal={abrirModal} /> {/* ← Aqui! */}

      </div>
    </div>
    
  );
}

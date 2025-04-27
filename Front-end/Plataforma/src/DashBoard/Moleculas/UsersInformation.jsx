import { UserInformationDiv } from "../Atomos/UserInformationDiv";

export function UserInformation() {
    return (
    <div className="h-[60vh] w-[72vw] flex flex-col items-center overflow-y-auto scrollbar-custom">
        <UserInformationDiv Nome="Samuel Teodoro Souza" Email="Samuel.Teodoro@Souza"/>
        <UserInformationDiv Nome="Yasmim Guiniver" Email="Yasmim.G.@Gmail"/>
        <UserInformationDiv Nome="Pedro Paulo" Email="Pedro.P.Novaes@Ymail"/>
        <UserInformationDiv Nome="Samuel Teodoro Souza" Email="Samuel.Teodoro@Souza"/>
        <UserInformationDiv Nome="Mayara Damas" Email="MayMay.Dam@Outlook"/>    
    </div>
    );
}

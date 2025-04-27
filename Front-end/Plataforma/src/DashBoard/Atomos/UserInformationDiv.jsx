export function UserInformationDiv({Nome = "Nome Padrão", Email = "Email Padrão"}) {
  return (
    <div>
    <div className="w-full h-[2vh]"></div>
    <div className="h-[12vh] w-[70vw] flex flex-row justify-start items-center shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-[white] rounded-[20px]">

      <img src="/src/assets/UserIconAdded.svg" className="h-[6vh] w-[3vw] ml-[5vh]"/>

      <div className="h-full w-[52vw] flex flex-row justify-center items-center text-[2vh] text-[#3A577B]">

        <div className="h-full w-[50%] justify-center items-center flex">
        <h2>{Nome}</h2>
        </div>

        <div className="h-full w-[50%] justify-center items-center flex">
        <h2>{Email}</h2>
        </div>

      </div>

      <img src="/src/assets/ModifyUser.svg" className="h-[4.8vh] w-[2.4vw] m-[2vh]"/>
      <img src="/src/assets/RemoveUser.svg" className="h-[4.6vh] w-[2.3vw] m-[2vh]"/>
    </div>
    </div>
  );
}
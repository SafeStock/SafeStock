export function UserInformationDiv({ id, Nome = "Nome Padrão", Cargo = "Cargo Padrão", Email = "Email Padrão", Telefone = "Telefone Padrão", abrirModal, confirmarExclusao  }) {
  return (
    <div>
      <div className="w-full h-[2vh]"></div>
      <div className="h-[12vh] w-[83vw] flex flex-row justify-start items-center shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-white rounded-[20px] relative right-[1vw]">
        <img src="/src/assets/UserIconAdded.svg" className="h-[6vh] w-[3vw] ml-[5vh]" />

        <div className="h-full w-[52vw] flex flex-row justify-center items-center text-[2vh] text-[#3A577B] relative left-[4vw]">
          <div className="h-full w-[50%] justify-center items-center flex">
            <h2>{Nome}</h2>
          </div>
          <div className="h-full w-[50%] justify-center items-center flex">
            <h2>{Cargo}</h2>
          </div>
          <div className="h-full w-[50%] justify-center items-center flex relative right-[-1vw]">
            <h2>{Email}</h2>
          </div>
          <div className="h-full w-[50%] justify-center items-center flex relative right-[-3vw]">
            <h2>{Telefone}</h2>
          </div>
        </div>

        <div className="h-full w-[6vw] flex flex-row justify-center items-center gap-[1vh] relative right-[-15vw]"> 
          <button
          onClick={abrirModal}
          className="h-[4.9vh] w-[2.5vw] flex justify-center items-center bg-transparent border-none cursor-pointer"
        >
          <img src="/src/assets/ModifyUser.svg" className="h-[4.8vh] w-[2.4vw] m-[2vh]" />
        </button>

        <button
        onClick={() => confirmarExclusao(id)}
        className="h-[4.9vh] w-[2.5vw] flex justify-center items-center bg-transparent border-none cursor-pointer"
        >
          <img src="/src/assets/RemoveUser.svg" className="h-[4.6vh] w-[2.3vw] m-[2vh]" />
        </button>
        </div>
        
      </div>
    </div>
  );
}

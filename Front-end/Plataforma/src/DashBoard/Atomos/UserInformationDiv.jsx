function formatarData(dataString, somenteData = false) {
  if (!dataString) return "-";
  // Garante que a data seja válida
  const data = new Date(dataString);
  if (isNaN(data.getTime())) return "-";
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  if (somenteData) {
    return `${dia}-${mes}-${ano}`;
  }
  const hora = String(data.getHours()).padStart(2, '0');
  const minutos = String(data.getMinutes()).padStart(2, '0');
  return `${dia}-${mes}-${ano} ${hora}:${minutos}`;
}

export function UserInformationDiv({
  id,
  valores = [],
  abrirModal,
  confirmarExclusao,
  mostrarIcone = true,
  mostrarIconesAlteracao = true,
  campos = [],
}) {
  return (
    <div>
      <div className="w-full h-[2vh]"></div>
    
      <div className="h-[12vh] w-[77vw] flex flex-row justify-start items-center shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-white rounded-[20px]">
        {mostrarIcone && (
          <img src="/src/assets/UserIconAdded.svg" className="h-[6vh] w-[3vw] ml-[5vh]" />
        )}

        <div className="h-full w-[60vw]  flex flex-row justify-center items-center text-[15px] text-[#3A577B]">
          {valores.map((valor, index) => (
            <div
              key={index}
              className="h-full w-[25%] justify-center items-center flex"
            >
              <h2>
                {campos[index] === "dataHora"
                  ? formatarData(valor)
                  : campos[index] === "data"
                  ? formatarData(valor, true)
                  : valor !== undefined
                  ? valor.toString()
                  : "-"}
              </h2>
            </div>
          ))}
        </div>
        {mostrarIconesAlteracao && (
          <div className="h-full w-[6vw] flex flex-row justify-center items-center gap-[1vh] relative right-[-11vw]">
            <button
              onClick={() => abrirModal(id)}
              className="h-[4.9vh] w-[2.5vw] flex justify-center items-center bg-transparent border-none cursor-pointer"
            >
              <img src="/src/assets/ModifyUser.svg" className="h-[4.8vh] w-[2.4vw]" />
            </button>

            <button
              onClick={() => confirmarExclusao(id)}
              className="h-[4.9vh] w-[2.5vw] flex justify-center items-center bg-transparent border-none cursor-pointer"
            >
              <img src="/src/assets/RemoveUser.svg" className="h-[4.6vh] w-[2.3vw]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
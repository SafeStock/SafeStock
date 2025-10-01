export function ExportInformationDiv({ titulo = "Undefined", onExport = () => {} }) {
    return (
        <div>
            <p className="text-[4vh] font-[510] m-[1vw]">{titulo}</p>
            <div className="flex justify-center items-center rounded-[1.5vw] w-[40vw] h-[9.5vh] shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
                <p className="text-[3.1vh] font-[500]">Exportar Relatorio Excel</p>
                <div
                    className={"flex justify-center items-center w-[2.5vw] h-[5vh] ml-[15vw] rounded-[0.9vw] border-[1.8px] cursor-pointer " +
                        "border-transparent transition-colors duration-400 hover:border-[#3A577B]"}
                    onClick={() => {
                        console.log("Export button clicked for:", titulo);
                        onExport();
                    }}
                    role="button"
                    title="Exportar"
                >
                    <img src="/src/assets/ButtonExport.svg" alt="Exportar" className="w-[3.1vh] h-[3.1vh]" />
                </div>
            </div>
        </div>
    );
}
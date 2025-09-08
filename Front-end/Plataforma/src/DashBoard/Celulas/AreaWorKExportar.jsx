import { ExportInformationDiv } from "../Moleculas/ExportInformationDiv"

export function AreaWorkExportar () {

    return(
        <div className="flex flex-row justify-center items-center h-[85vh] w-[100vw] text-[#3A577B]">
            <div className=" flex items-center justify-start flex-col w-[40%] h-[65vh] relative right-[3.5vh] ml-[6vw] mb-[10vh]">
                <ExportInformationDiv titulo="Relatório Geral" />
                <ExportInformationDiv titulo="Registros de Uso" />
                <ExportInformationDiv titulo="Movimentações do estoque" />
            </div>
            <div className=" flex items-center justify-start flex-col w-[40%] h-[65vh] relative right-[3.5vh] ml-[4vw] mb-[10vh]">
                <ExportInformationDiv titulo="Produtos" />
                <ExportInformationDiv titulo="Alertas" />
            </div>
        </div>
    )
}
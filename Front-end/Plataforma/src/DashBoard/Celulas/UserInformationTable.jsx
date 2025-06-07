import { StatusBadge } from "../Atomos/BolinhaStatus";

export function UserInformationTable({
    titles,
    campos,
    dados,
    tabela,
    abrirModal,
    confirmarExclusao,
    mostrarIcone,
    mostrarIconesAlteracao
}) {

    return (
        <div className="relative top-[1vh]">
            {/* Cabeçalho*/}
            <div className="w-full bg-white sticky top-0 z-50  shadow-md">
                <table className="w-full text-[#3A577B] border-collapse  table-fixed">
                    <colgroup>
                        {mostrarIcone && <col className="w-[6vw]" />}
                        {titles.map((title, idx) => (
                            <col key={title || idx} className="w-auto" />
                        ))}
                        <col className="w-[2vw]" />
                    </colgroup>
                    <thead>
                        <tr>
                            {mostrarIcone && <th className="p-[1vh] text-center"></th>}
                            {titles.map((title, i) => (
                                <th key={title || i} className="p-[1vh] text-center text-[2.5vh] bg-[white] ">
                                    {title}
                                </th>
                            ))}
                            <th className="p-[3vh] text-center text-[2vh] bg-[white]"></th>
                        </tr>
                    </thead>
                </table>
            </div>

            {/* Campos */}
            <div className="h-[61vh] w-[104%] overflow-y-auto  ">
                <table className="w-[100%] text-[#3A577B] border-separate border-spacing-[2vh]  table-fixed ">
                    <colgroup>
                        {mostrarIcone && <col className="w-[4vw]" />}
                        {titles.map((title, index) => (
                            <col key={title || index} className="w-full" />
                        ))}
                        <col className="w-[4.5vw]" />
                    </colgroup>
                    <tbody>
                        {dados.map((item, i) => (
                            <tr key={item.id || i} className="h-[10vh] shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-[20px] text-[2vh] ">
                                {mostrarIcone && (
                                    <td className="p-[2.5vh]">
                                        {tabela === "produtos" ? (
                                            <span className="h-[4vh] w-[3vw]" />
                                        ) : (
                                            <img src="/src/assets/UserIconAdded.svg" className="h-[4vh] w-[3vw]" />
                                        )}
                                    </td>
                                )}
                                {campos.map((campo, j) => (
                                    <td key={campo || j} className="text-center w-auto ">
                                        {campo === "status" ? (
                                            <StatusBadge status={item[campo]} className="relative left-[1]" />
                                        ) : (
                                            item[campo]
                                        )}
                                    </td>
                                ))}
                                {(mostrarIcone || mostrarIconesAlteracao) && (
                                    <td className="w-[10vh]">
                                        {mostrarIcone && (
                                            <button onClick={() => abrirModal(item.id)} className="bg-transparent border-none cursor-pointer">
                                                <img src="/src/assets/ModifyUser.svg" className="h-[2.5vh] w-[2vw]" />
                                            </button>
                                        )}
                                        {mostrarIconesAlteracao && (
                                            <button onClick={() => confirmarExclusao(item.id)} className="bg-transparent border-none cursor-pointer">
                                                <img src="/src/assets/RemoveUser.svg" className="h-[2.5vh] w-[2vw]" />
                                            </button>
                                        )}
                                    </td>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}
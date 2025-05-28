export function UserInformationTable({
    titles,
    campos,
    dados,
    abrirModal,
    confirmarExclusao,
    mostrarIcone,
    mostrarIconesAlteracao
}) {
    return (
        <div className="h-full">
            {/* Cabeçalho fixo */}
            <div className="w-full bg-white sticky top-0 z-50  shadow-md">
                <table className="w-full text-[#3A577B] border-collapse  table-fixed">
                    <colgroup>
                        {mostrarIcone && <col className="w-[4.5vw] " />}
                        {titles.map(() => <col className="w-auto" />)}
                        <col className="w-[4.5vw] " />
                    </colgroup>
                    <thead>
                        <tr>
                            {mostrarIcone && <th className="p-[1vh] text-center text-[2vh]  "></th>}
                            {titles.map((title, i) => (
                                <th key={i} className="p-[1vh] text-center text-[2vh] bg-[white] ">
                                    {title}
                                </th>
                            ))}
                            <th className="p-[1vh] text-center text-[2vh] bg-[white]"></th>
                        </tr>
                    </thead>
                </table>
            </div>

            {/* Corpo rolável com alinhamento perfeito */}
            <div className="h-[50vh] w-[103%] overflow-y-auto  ">
                <table className="w-[100%] text-[#3A577B] border-separate border-spacing-[2vh]  table-fixed ">
                    <colgroup>
                        {mostrarIcone && <col className="w-[4vw]   " />}
                        {titles.map(() => <col className="w-full " />)}
                        <col className="w-[4.5vw] " />
                    </colgroup>
                    <tbody>
                        {dados.map((item, i) => (
                            <tr key={i} className="h-[10vh] shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-[20px] ">
                                {mostrarIcone && (
                                    <td className="p-[2.5vh] ">
                                        <img src="/src/assets/UserIconAdded.svg" className="h-[4vh] w-[3vw]  " />
                                    </td>
                                )}
                                {campos.map((campo, j) => (
                                    <td key={j} className="text-center w-auto ">
                                        {item[campo]}
                                    </td>
                                ))}
                                {(mostrarIcone || mostrarIconesAlteracao) && (
                                    <td className=" w-[10vh] ">
                                        {mostrarIcone && (
                                            <button onClick={() => abrirModal(item.id)} className="bg-transparent border-none cursor-pointer ">
                                                <img src="/src/assets/ModifyUser.svg" className="h-[2.5vh] w-[2vw] " />
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

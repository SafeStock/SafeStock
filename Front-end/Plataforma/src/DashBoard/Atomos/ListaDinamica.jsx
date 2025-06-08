import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import PropTypes from "prop-types";

dayjs.locale('pt-br');

export function ListaDinamica({
    endpoint,
    campos,
    nomesCampos, 
    titulo,
    formataDados,
    token,
    atualizar,
    hideTitle = false,
    customHeader = null,
    onRowClick = null,
    disableAutoDate = false
}) {

    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);


    const formatarNomeCampo = (campo) => {
        return nomesCampos?.[campo] ||
            campo.charAt(0).toUpperCase() + campo.slice(1).toLowerCase();
    };


    const formatarDataBr = (dataString) => {
        if (!dataString || dataString === "-") return "-";

        const data = dayjs(dataString);
        if (!data.isValid()) return dataString;

        const temHora = data.hour() !== 0 || data.minute() !== 0;
        return temHora
            ? data.format("DD-MM-YYYY HH:mm")
            : data.format("DD-MM-YYYY");
    };

    const formatarDadosPadrao = (dados) => {
        if (disableAutoDate) return dados;

        return dados.map(item => {
            const novoItem = { ...item };
            Object.keys(novoItem).forEach(key => {
                if (key.toLowerCase().includes("data")) {
                    novoItem[key] = formatarDataBr(novoItem[key]);
                }
            });
            return novoItem;
        });
    };

    useEffect(() => {
        if (!token || !endpoint) return;

        const buscarDados = async () => {
            try {
                setCarregando(true);
                setErro(null);
                const resposta = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const dadosFormatados = formataDados
                    ? formataDados(resposta.data)
                    : formatarDadosPadrao(resposta.data);

                setDados(dadosFormatados);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setErro(`Erro ao carregar dados: ${error.response?.data?.message || error.message}`);
            } finally {
                setCarregando(false);
            }
        };

        buscarDados();
    }, [token, endpoint, atualizar, formataDados, disableAutoDate]);

    if (carregando) return <div className="p-4 text-center">Carregando...</div>;
    if (erro) return <div className="p-4 text-red-500 text-center">{erro}</div>;
    if (!dados || dados.length === 0) return <div className="p-4 text-center">Nenhum dado encontrado.</div>;

    return (
        <div className=" w-full">
            {/* Título (se não estiver escondido) */}
            {!hideTitle && titulo && (
                <h2 className="">
                    {titulo}
                </h2>
            )}

            {/* Cabeçalho da tabela */}
            <div className="w-full bg-white sticky top-[10vh] z-50 shadow-md ">
                <table className="w-full text-[#3A577B] border-collapse table-fixed ">
                    <colgroup>
                        {campos.map(() => <col className="w-auto" />)}
                    </colgroup>
                    <thead>
                        {customHeader || (
                            <tr>
                                {campos.map((campo, i) => (
                                    <th key={i} className="p-[1vh] text-center text-[2vh]">
                                        {formatarNomeCampo(campo)}
                                    </th>
                                ))}
                            </tr>
                        )}
                    </thead>
                </table>
            </div>

            {/* Corpo da tabela */}
            <div className="h-[50vh] w-full overflow-y-auto">
                <table className="w-full text-[#3A577B] border-separate border-spacing-[2vh] table-fixed">
                    <colgroup>
                        {campos.map((_, index) => (
                            <col key={index} className="w-full" />
                        ))}
                    </colgroup>
                    <tbody>
                        {dados.map((item, i) => (
                            <tr
                                key={i}
                                className={`h-[7vh] shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-[20px] text-[1.5vh] ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                                onClick={() => onRowClick && onRowClick(item)}
                            >
                                {campos.map((campo, j) => (
                                    <td
                                        key={j}
                                        className={`text-center w-auto p-[1vh] ${campo.toLowerCase().includes("data") ? "font-mono whitespace-nowrap" : ""}`}
                                    >
                                        {item[campo] || "-"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

ListaDinamica.propTypes = {
    endpoint: PropTypes.string.isRequired,
    campos: PropTypes.arrayOf(PropTypes.string).isRequired,
    titulo: PropTypes.string,
    formataDados: PropTypes.func,
    token: PropTypes.string,
    atualizar: PropTypes.any,
    hideTitle: PropTypes.bool,
    customHeader: PropTypes.node,
    onRowClick: PropTypes.func,
    disableAutoDate: PropTypes.bool,
};
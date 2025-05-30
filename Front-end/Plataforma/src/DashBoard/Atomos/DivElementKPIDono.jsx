import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ListaDinamica } from "./ListaDinamica";
import { GraficoEstoqueBar } from "../Atomos/GraficoEstoqueBar";
import { MiniHistoricoAlerta } from "../Atomos/MiniHistoricoAlerta";
import { getToken } from '../Moleculas/getToken';

// Componente de KPI pequeno (lado esquerdo)
export function DivElementKPIDonoLittleLeft({ ImgUrl, Titulo, Qtd }) {
    return (
        <div className="w-[12.4vw] h-[18vh] rounded-[2vh] items-center flex flex-col mt-[1vh] shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
            <div className="w-full h-[48.5%] flex items-center justify-center">
                <div className="w-[65%] h-full flex flex-row items-end justify-around">
                    <img src={ImgUrl} className="w-[42.5%] h-[80%]" alt={Titulo} />
                    <div className="w-[35%] h-full flex items-end justify-center text-[#9AC7D9]">
                        <h1 className="text-[5vh]">{Qtd}</h1>
                    </div>
                </div>
            </div>
            <div className="w-[80%] h-[0.2vh] bg-[#9AC7D9]"></div>
            <div className="w-full h-[48.5%] flex items-center justify-center">
                <div className="w-[80%] h-full">
                    <p className="text-[17px] mt-[1vh] text-center">{Titulo}</p>
                </div>
            </div>
        </div>
    );
}

// Componente de KPI grande (lado esquerdo)
export function DivElementKPIDonoBigLeft({
    tamanho,
    displayAlerta = "none",
    displayGrafico = "none",

}) {
    return (
        <div
            className="w-[97%] bg-white rounded-[2vh] shadow-[0_5px_10px_rgba(0,0,0,0.2)]"
            style={{ height: tamanho }}
        >
            <div className="w-[100%] flex flex-col h-[38vh]" style={{ display: displayGrafico }}>
                <div className="text-[#3A577B] w-full h-[5vh] flex justify-center items-end text-[23px] font-[600]">
                    Movimentação do Estoque
                </div>
                <GraficoEstoqueBar />
            </div>

            <div className="w-[100%] h-[100%] flex flex-col" style={{ display: displayAlerta }}>
                <MiniHistoricoAlerta
                    endpoint='http://localhost:8080/api/historicoAlertas'
                />
            </div>
        </div>
    );
}

// Componente de KPI pequeno (lado direito)
export function DivElementKPIDonoLittleRight() {
    return (
        <div className="w-[99%] h-[18vh] bg-white rounded-[2vh] mt-[1vh] shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center">
            <div className="text-[#3A577B] w-full h-[30%] flex justify-center items-center text-[25px] font-[600]">
                Status de abastecimento
            </div>
            <div className="w-full h-[40%] flex justify-center items-center">
                <div className="bg-[#E8F0F1] w-[25vw] h-[6.5vh] rounded-[40px] overflow-hidden relative">
                    <div className="absolute w-[25vw] h-[6.5vh] flex justify-center items-center">
                        <p className="text-[#3A577B] font-[400] text-[25px]">50%</p>
                    </div>
                    <div className="bg-[#9AC7D9] w-[50%] h-full"></div>
                </div>
            </div>
        </div>
    );
}

// Componente de KPI grande (lado direito)
export function DivElementKPIDonoBigRight({
    NameUse = "Histórico de Uso",
    buttonNameUse = "Ver Histórico",
    customEndpoint,
    customCampos,
    customHeight = "35vh"
}) {
    const navigate = useNavigate();
    const token = getToken();


    const formatarDadosUso = (dados) => {
        return dados.map(item => ({
            ...item,
            produto: item.produto || "-",
            quantidade: item.quantidade ? `${item.quantidade}` : "-",
            dataValidade: formatarDataEspecifica(item.dataValidade),
            dataHoraSaida: formatarDataEspecifica(item.dataHoraSaida)
        }));
    };

    const formatarDataEspecifica = (dataString) => {
        if (!dataString) return "-";

        const data = dayjs(dataString);
        if (!data.isValid()) return "-";

        const temHora = data.hour() !== 0 || data.minute() !== 0;
        return temHora
            ? data.format("DD-MM-YYYY HH:mm")
            : data.format("DD-MM-YYYY");
    };

    const irParaTelaDeHistoricoUso = () => {
        navigate("/dashboard/historicouso");
    };


    return (
        <div className="w-[99%] h-[74%] bg-white rounded-[2vh] shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col">
            <div className="w-full h-[20%] flex justify-center items-center ">
                <p className="text-[#3A577B] font-[600] text-[3vh] ">{NameUse}</p>
            </div>


            <div className="w-full " style={{ height: customHeight }}>
                <ListaDinamica
                    endpoint={customEndpoint}
                    campos={customCampos || ["produto", "quantidade", "dataValidade", "dataHoraSaida"]}
                    token={token}
                    formataDados={formatarDadosUso}
                    hideTitle
                    compact
                    disableAutoDate={true}
                    nomesCampos={{
                        'produto': 'Produto',
                        'quantidade': 'Quantidade',
                        'dataValidade': 'Validade',
                        'dataHoraSaida': 'Saída'
                    }}
                />
            </div>


            <div className="w-full h-[18%] flex justify-center items-center">
                <button
                    className="border-0 bg-[#3A577B] text-[14px] text-[#eee] font-[600] rounded-[3vh]
        w-[9vw] h-[5vh] cursor-pointer hover:bg-[white] hover:text-[#2F4772] 
        hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200"
                    onClick={irParaTelaDeHistoricoUso}
                >
                    {buttonNameUse}
                </button>
            </div>
        </div>
    );
}

// Componentes auxiliares
export function AlertaInformationDiv({ tamanho, children }) {
    return (
        <div className="h-[13vh] z-[1]" style={{ width: tamanho }}>
            {children}
        </div>
    );
}

export  function AlertExibition({ alert }) {
    return (
        <div className="w-full h-[6vh] text-[19px] flex justify-center items-center">
            "{alert}"
        </div>
    );
}

export function StatusAlertExibition({ cor, status }) {
    return (
        <div className="w-full h-[6vh] flex flex-row justify-center items-center">
            <div className="w-[3vh] h-[3vh] rounded-[50%] mr-[1vw]" style={{ background: cor }}></div>
            {status}
        </div>
    );
}


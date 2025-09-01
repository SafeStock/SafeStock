import { useState } from "react";
import dayjs from "dayjs";
import { ListaDinamica } from "./ListaDinamica";
import { GraficoEstoqueBar } from "../Atomos/GraficoEstoqueBar";
import { MiniHistoricoAlerta } from "../Atomos/MiniHistoricoAlerta";
import { getToken } from '../Moleculas/getToken';
import { useNavigate } from "react-router-dom";
import { useSetAba } from "../../Hooks/setAba";

// Componente de KPI pequeno (lado esquerdo)
export function DivElementKPIDonoLittleLeft({ ImgUrl, Titulo, Qtd }) {
    return (
        <div className="w-[12.4vw] h-[18vh] rounded-[2vh] items-center flex flex-col mt-[1vh]  shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
            <div className="w-full h-[48.5%] flex items-center justify-center">
                <div className="w-[65%] h-full flex flex-row items-end justify-around">
                    <img src={ImgUrl} className="w-[42.5%] h-[80%]" alt={Titulo} />
                    <div className="w-[35%] h-full flex items-end justify-center text-[#9AC7D9]">
                        <strong className="text-[5vh]">{Qtd}</strong>
                    </div>
                </div>
            </div>
            <div className="w-[80%] h-[0.2vh] bg-[#9AC7D9]"></div>
            <div className="w-full h-[48.5%] flex items-center justify-center">
                <div className="w-[81%] h-full">
                    <p className="text-[1.9vh] mt-[1vh] text-center">{Titulo}</p>
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
            className="w-[95%] bg-white rounded-[2vh] shadow-[0_5px_10px_rgba(0,0,0,0.2)]"
            style={{ height: tamanho }}
        >
            <div className="w-full flex flex-col h-[38vh]" style={{ display: displayGrafico }}>
                <div className="text-[#3A577B] w-full h-[8vh] flex justify-center items-end text-[23px] font-[600]">
                    Movimentação do Estoque
                </div>
                <GraficoEstoqueBar />
            </div>

            <div className="w-full h-full flex flex-col" style={{ display: displayAlerta }}>
                <MiniHistoricoAlerta
                    endpoint='http://localhost:8080/api/historicoAlertas'
                />
            </div>
        </div>
    );
}

export function DivElementKPIDonoBigRight({
    NameUse = "Histórico de Uso",
    buttonNameUse = "Ver Histórico",
    customEndpoint,
    customCampos,
    customHeight = "35vh",
    NavigateOn = "none"
}) {
    // const navigate = useNavigate();
    const token = getToken();

    const [modalAberto, setModalAberto] = useState(false);

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

    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => setModalAberto(false);

    const navigate = useNavigate();

    const useAba = useSetAba();

    const handleRedirect = (path) => {
        navigate(path);
        useAba;
    };

    return (
        <div className="w-full h-full  rounded-[2vh] shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col ">
            <div className="w-full h-[20%] flex justify-center items-center ">
                <p className="text-[#3A577B] font-[700] text-[3.5vh] ">{NameUse}</p>
            </div>

            <div className="w-full " style={{ height: customHeight }}>
                <ListaDinamica
                    endpoint={customEndpoint}
                    campos={customCampos || ["produto", "quantidade", "funcionarioNome", "dataHoraSaida"]}
                    token={token}
                    formataDados={formatarDadosUso}
                    hideTitle
                    compact
                    disableAutoDate={true}
                    nomesCampos={{
                        'produto': 'Produto',
                        'quantidade': 'Quantidade',
                        'funcionarioNome': 'Responsável',
                        'dataHoraSaida': 'Saída'
                    }}
                />
            </div>

            <div className="flex justify-center items-center relative top-[19vh] ">

                <button
                    className="border-0 bg-[#3A577B] text-[14px] text-[#eee] font-[600] rounded-[3vh]
        p-[1.5vh] cursor-pointer hover:bg-[white] hover:text-[#2F4772] 
        hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200"
                    onClick={() => handleRedirect('historicouso')} style={{ display: NavigateOn }}>
                    {buttonNameUse}
                </button>


                <button
                    className="border-0 bg-[#3A577B] text-[14px] text-[#eee] font-[600] rounded-[3vh]
        p-[1.5vh] cursor-pointer hover:bg-[white] hover:text-[#2F4772] 
        hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200"
                    onClick={abrirModal} style={{ display: NavigateOn === "block" ? "none" : "block" }}
                >
                    {buttonNameUse}
                </button>
            </div>


            {/* Modal centralizado */}
            {modalAberto && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0,0,0,0.5)",
                    }}
                >
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "1rem",
                            boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
                            padding: "10vh",
                            // minWidth: "320px",
                            // width: "400px",
                            width: "25vw",
                            height: "30vw",
                            maxHeight: "60vh",
                            overflow: "hidden",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            onClick={fecharModal}
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 18,
                                background: "transparent",
                                border: "none",
                                fontSize: "1.5rem",
                                color: "#888",
                                cursor: "pointer",
                            }}
                            aria-label="Fechar"
                        >
                            ×
                        </button>
                        <CadastroUso
                            titulo="Registrar Uso"
                            campos={[
                                { name: "nome", label: "Nome:", placeholder: "Digite o nome do produto" },
                                { name: "quantidade", label: "Quantidade:", placeholder: "Digite a quantidade de produtos" },
                                { name: "dataValidade", label: "Data de validade:", placeholder: "Digite a data de validade (ex: 08/27)" },
                                { name: "dataRetirada", label: "Data de retirada:", placeholder: "Digite a data de retirada (ex: 08/27)" }
                            ]}
                            onSubmit={fecharModal}
                        />
                    </div>
                </div>
            )}

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

export function AlertExibition({  children }) {
    return (
        <div className="w-full h-[6vh] text-[19px] flex justify-center items-center animate-pulsar">
            {children}
        </div>
    );
}

export function StatusAlertExibition({ cor, status }) {
  return (
    <div className="w-full h-[6vh] flex flex-row justify-center items-center animate-pulsar">
      <div
        className="w-[3vh] h-[3vh] rounded-full mr-[1vw] animate-pulsar"
        style={{ backgroundColor: cor }}
      />
      <span className="animate-pulsar" style={{ color: cor }}>
        {status}
      </span>
    </div>
  );
}


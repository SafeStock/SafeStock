import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ListaDinamica } from "./ListaDinamica";
import { GraficoEstoqueBar } from "../Atomos/GraficoEstoqueBar";
import MiniHistoricoAlerta from "../Atomos/MiniHistoricoAlerta";
import { getToken } from '../Moleculas/getToken';
import { useNavigate } from "react-router-dom";
import { useSetAba } from "../../Hooks/setAba";
import { Modal } from "../Atomos/Modal"; 
import { CadastroUso } from "../CadastroUso"; 


export function DivElementKPIDonoLittleLeft({ ImgUrl, Titulo, endpoint }) {
  const [Qtd, setQtd] = useState("-");
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let isMounted = true; // evita setState se componente desmontar

    async function fetchQtd() {
      try {
        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });

        
        // console.log(`Resposta do endpoint ${endpoint}: status=${res.status}, content-type=${res.headers.get("content-type")}`);

        let data;

        if (res.headers.get("content-type")?.includes("application/json")) {
          data = await res.json();
          // console.log("data JSON:", data);
        } else {
          console.warn("Resposta não é JSON, retornando placeholder.");
          data = { qtd: "-" };
        }

        if (isMounted) {
          setQtd(typeof data === "number" ? data : data.qtd ?? "-");
          setErro(false);
        }
      } catch (err) {
        console.error(`Erro ao buscar Qtd do endpoint ${endpoint}:`, err);
        if (isMounted) {
          setQtd("-");
          setErro(true);
        }
      }
    }

    fetchQtd(); // fetch inicial
    const interval = setInterval(fetchQtd, 5000); // atualiza a cada 5s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [endpoint]);

  return (
    <div className="w-[12.4vw] h-[18vh] rounded-[2vh] items-center flex flex-col mt-[1vh] shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
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
          <p className="text-[1.9vh] mt-[1vh] text-center">
            {Titulo} {erro && "(Erro)"}
          </p>
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
  buttonNameUse = "Registrar Uso",
  customEndpoint,
  customCampos,
  customHeight = "35vh",
  NavigateOn = "none"
}) {
  const token = getToken();
  const [modalAberto, setModalAberto] = useState(false);
  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);
  const navigate = useNavigate();
  const useAba = useSetAba();

  const handleRedirect = (path) => {
    navigate(path);
    useAba;
  };

  const formatarDataEspecifica = (dataString) => {
    if (!dataString) return "-";
    const data = dayjs(dataString);
    if (!data.isValid()) return "-";
    const temHora = data.hour() !== 0 || data.minute() !== 0;
    return temHora ? data.format("DD-MM-YYYY HH:mm") : data.format("DD-MM-YYYY");
  };

  const formatarDadosUso = (dados) => {
    return dados.map(item => ({
      ...item,
      produto: item.produto || "-",
      quantidade: item.quantidade ? `${item.quantidade}` : "-",
      dataHoraSaida: formatarDataEspecifica(item.dataHoraSaida),
      funcionarioNome: item.funcionarioNome || "-"
    }));
  };

  return (
    <div className="w-full h-full rounded-[2vh] shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col">
      {/* Título */}
      <div className="w-full h-[20%] flex justify-center items-center">
        <p className="text-[#3A577B] font-[700] text-[3.5vh]">{NameUse}</p>
      </div>

      {/* Lista */}
      <div className="w-full" style={{ height: customHeight }}>
        <ListaDinamica
          endpoint={customEndpoint}
          campos={customCampos || ["produto", "quantidade", "funcionarioNome", "dataHoraSaida"]}
          token={token}
          formataDados={formatarDadosUso}
          hideTitle
          compact
          disableAutoDate={true}
          nomesCampos={{
            produto: "Produto",
            quantidade: "Quantidade",
            funcionarioNome: "Responsável",
            dataHoraSaida: "Saída"
          }}
        />
      </div>

      {/* Botões */}
      <div className="flex justify-center items-center relative top-[19vh]">
        {/* Botão que navega */}
        <button
          className="border-0 bg-[#3A577B] text-[14px] text-[#eee] font-[600] rounded-[3vh] p-[1.5vh] cursor-pointer hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200"
          onClick={() => handleRedirect("historicouso")}
          style={{ display: NavigateOn }}
        >
          Ver Histórico
        </button>

        {/* Botão que abre modal */}
        <button
          className=" border-0 bg-[#3A577B] text-[14px] text-[#eee] font-[600] rounded-[3vh] p-[1.5vh] cursor-pointer hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200"
          onClick={abrirModal}
          style={{ display: NavigateOn === "block" ? "none" : "block" }}
        >
          {buttonNameUse}
        </button>
      </div>

      {/* Modal com CadastroUso */}
      <Modal isOpen={modalAberto} onClose={fecharModal}>
        <CadastroUso fecharModal={fecharModal} />
      </Modal>
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


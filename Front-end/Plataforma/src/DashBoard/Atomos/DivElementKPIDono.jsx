import { Children } from "react";
import { DivisionDivElementKPIDonoLittle } from "./Divisions";
import { DivisionDivElementKPIDonoLittleRightDiv } from "./Divisions";
import { useNavigate } from "react-router-dom";



export function DivElementKPIDonoLittleLeft({ImgUrl, Titulo, Qtd}){
    return(
        <div className="w-[12.4vw] h-[20vh] rounded-[2vh] items-center flex flex-col overflow-hidden shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
            <div className="w-full h-[48.5%] flex items-center justify-center">
            <div className="w-[65%] h-full flex flex-row items-end justify-around">
                    <img src={ImgUrl} className="w-[42.5%] h-[80%]"/>
                    <div className="w-[35%] h-full flex items-end justify-center text-[#9AC7D9]">
                    <h1 className="mb-[20%] text-[5vh]">{Qtd}</h1>
                </div>
                </div>
            </div>
             <DivisionDivElementKPIDonoLittle/>
            <div className="w-full h-[48.5%] flex items-center justify-center">
                <div className="w-[65%] h-full">
                    <p className="text-[1.7vh] text-center">
                    {Titulo}
                    </p>
                </div>
            </div>
        </div>
    )
}



export function DivElementKPIDonoBigLeft({tamanho, displayAlerta}){
    return(
        <div className="w-[97%] bg-[white] rounded-[2vh] 
        shadow-[0_5px_10px_rgba(0,0,0,0.2)] items-center justify-center" style={{height: tamanho}}>

            <div className="w-[100%] h-[100%] flex flex-col " style={{display: displayAlerta}}>
            <div className="text-[#3A577B] w-full h-[5vh] flex justify-center items-end text-[23px] font-[inter] font-[600]">
            Histórico de Alertas
            </div>
            <div className="w-[100%] h-[16vh] flex justify-center items-center">
                <div className="h-full w-full flex flex-col justify-center items-center">

                    <AlertaInformationDiv tamanho="20vw">
                         <div className="text-[#547A81] font-[raleway] font-[600] text-[21.5px] w-full h-[30%] 
                         flex justify-center items-center">
                            Alerta
                            </div>
                        <AlertExibition alert="Produto 1 - Vencido"/>
                    </AlertaInformationDiv>
                </div>
                <div className="h-full w-full flex flex-col justify-center items-center">
                    <AlertaInformationDiv tamanho="20vw">
                        <div className="text-[#547A81] font-[raleway] font-[600] text-[21.5px] w-full h-[30%] 
                         flex justify-center items-center">
                            Status
                        </div>
                        <StatusAlertExibition cor="#E10000" status="Critico"/>
                    </AlertaInformationDiv>
                </div>
            </div>
            </div>
        </div>
    )
}



export function DivElementKPIDonoLittleRight(){
    return(
        <div className="w-[95%] h-[25%] bg-[white] rounded-[2vh] mt-[2vh]
        shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center">
            <div className="text-[#3A577B] w-full h-[30%] flex justify-center items-center text-[25px] font-[inter] font-[600]">
            Status de abastecimento
            </div>
            <div className="w-full h-[40%] flex justify-center items-center">
                <div className="bg-[#E8F0F1] w-[70%] h-[85%] rounded-[40px] overflow-hidden">
                <div className="bg-[#9AC7D9] w-[50%] h-full rounded-[40px]">
                    <p className="text-[#3A577B] absolute font-[400] font-[inter] text-[28px] ml-[9.5vw] mt-[1.1vh]">50%</p>
                </div>
                </div>
            </div>
        </div>
    )
}



export function DivElementKPIDonoBigRight(){

    const Navigate = useNavigate();
    const irParaTelaDeHistoricoUso = () => {  
        Navigate("/dashboard/historicouso") // Altere para a URL desejada
    }

    return(
        <div className="w-[95%] h-[70%] bg-[white] rounded-[2vh] 
        shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center">
            <div className="w-full h-[15%] flex justify-center items-center">
                <p className="text-[#3A577B] font-[600] text-[25px] font-[inter]">Histórico de uso</p>
            </div>
            <div className="w-full h-[67%] flex flex-col items-center bg-transparent">
                <div className="w-full h-[10%] flex flex-row font-[inter] text-[#44808B] text-[17px] font-[300]">
                    <div className="w-full h-full text-center">
                        Produto
                    </div>
                    <div className="w-full h-full ">
                        Quantidade
                    </div>
                    <div className="w-full h-full ">
                        Data Validade
                    </div>
                    <div className="w-full h-full ">
                        Data Saida
                    </div>
                </div>
                <div className="mt-[1vh] flex flex-col items-center w-[100%] h-[35vh] overflow-y-auto z-[0] scrollbar-custom ">
                    <ProdutoInformationDiv/>     <ProdutoInformationDiv/>

                </div>
            </div>
            <div className="w-full h-[18%] flex justify-center items-center flex justify-around">
                <button className="
                border-0 bg-[#3A577B] text-[15px] text-[#eee] font-[Raleway] font-[600]
                rounded-[3vh]
                w-[9vw] h-[5vh] cursor-pointer
                hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200"
                onClick={irParaTelaDeHistoricoUso}>
                    Ver Histórico
                </button>
                </div>

        </div>
    )
}





export function ProdutoInformationDiv(){
    return(
        <div>
        <DivisionDivElementKPIDonoLittleRightDiv/>
        <div className="w-[31vw] h-[8vh] shadow-[0_0_5px_rgba(0,0,0,0.4)] rounded-[2vh] z-[1]">
        </div>
        <DivisionDivElementKPIDonoLittleRightDiv/>
        </div>
    )
}


export function AlertaInformationDiv({tamanho, children}){
    return(
        <div>
        <div className="h-[13vh] z-[1]" style={{width: tamanho}}>
            {children}
        </div>
        </div>
    )
}

export function AlertExibition({ alert }){
    return(
        <div className="w-full h-[6vh] text-[19px] flex justify-center items-center">
            "{alert}"
        </div>
    )
}

export function StatusAlertExibition({cor, status}){
    return(
        <div className="w-full h-[6vh] text-[px] flex flex-row justify-center items-center ">
            <div className="w-[2vw] h-[4vh] rounded-[50%] mr-[1vw]" style={{background: cor}}></div>
            {status}
        </div>
    )
}

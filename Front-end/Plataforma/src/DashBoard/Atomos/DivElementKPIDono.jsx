import { DivisionDivElementKPIDonoLittle } from "./Divisions";
import { DivisionDivElementKPIDonoLittleRightDiv } from "./Divisions";
import { useNavigate } from "react-router-dom";



export function DivElementKPIDonoLittleLeft({ImgUrl, Titulo, Qtd}){
    return(
        <div className="w-[11.5vw] h-[20vh] rounded-[2vh] items-center flex flex-col overflow-hidden shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
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



            <div className="w-[100%] w-[100%] flex flex-col" style={{display: displayAlerta}}>
            <div className="text-[#3A577B] w-full h-[30%] flex justify-center items-center text-[21px] bg-[black] font-[inter] font-[600]">
            Histórico de Alertas
            
            </div>
            <div className="w-[100%] h-[17.7vh] flex justify-center items-center bg-[red]">
                
            </div>
            </div>
        </div>
    )
}



export function DivElementKPIDonoLittleRight(){
    return(
        <div className="w-[97%] h-[25%] bg-[white] rounded-[2vh] mt-[2vh]
        shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center">
            <div className="text-[#3A577B] w-full h-[30%] flex justify-center items-center text-[22.5px] font-[inter] font-[600]">
            Status de abastecimento
            </div>
            <div className="w-full h-[40%] flex justify-center items-center">
                <div className="bg-[#E8F0F1] w-[70%] h-[85%] rounded-[40px] overflow-hidden">
                <div className="bg-[#9AC7D9] w-[50%] h-full rounded-[40px]">
                    <p className="text-[#3A577B] absolute font-[400] font-[inter] text-[26px] ml-[10vw] mt-[1.4vh]">50%</p>
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
        <div className="w-[97%] h-[70%] bg-[white] rounded-[2vh] 
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
                <div className="mt-[1vh] flex flex-col items-center w-[95%] h-[35vh] overflow-y-auto z-[0]">
                    <ProdutoInformationDiv/>
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
        </div>
    )
}
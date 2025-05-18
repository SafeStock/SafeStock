import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CadastroProdutosEtapa2({ formData, setFormData, titulo }) {
    const navigate = useNavigate();

    // AQUI ENVIA PARA O BANCO DE DADOS
    const enviar = (e) => {
        e.preventDefault();
        // enviar para o banco de dados 
        console.log(formData);
        navigate('/produtos');
    }

    const inputClass =
        "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none mb-[2vh] "

    const labelClass = "block text-sm font-medium text-gray-600 text-[#2F4672] mb-[0.5rem] ";

    const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)]  hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh] mt-[1vh] w-[40%] h-[4.5vh] mx-auto";

    const mainContaner = "flex items-center justify-center h-screen bg-gray-100";
    const container = "w-[21vw] h-[50vh] p-[8vh] bg-white rounded-[30px] shadow-lg p-8 shadow-[3px_3px_8px_rgba(0,0,0,0.3)]";

    const title = "text-2xl font-bold text-center text-[#2F4672] mb-[1.5rem]"

    const form = "flex flex-col gap-6"

    return (
        <>
            <div className={mainContaner}>
                <div className={container}>
                    <h2 className={title}>{titulo}</h2>
                    <div>
                        <form onSubmit={enviar} className={form}>
                            <div className="content">
                            <label htmlFor="limiteDeUso" className={labelClass}>Limite de uso: </label>
                            <input
                                type="text"
                                id="limiteDeUso"
                                className={inputClass}
                                placeholder="Digite o limite de uso semanal:"
                                onChange={(e) => setFormData({ ...formData, limiteDeUso: e.target.value })} />
                            <br />
                            </div>

                            <div className="content">
                            <label htmlFor="dataValidade" className={labelClass}>Data de validade:</label>
                            <input
                                type="text"
                                id='dataValidade'
                                className={inputClass}
                                placeholder='Digite a data de validade (ex: 08/27)'
                                onChange={(e) => setFormData({ ...formData, dataValidade: e.target.value })} />
                            <br />
                            </div>


                            <div className="content">
                            <label htmlFor="dataEntrada" className={labelClass}>Data de entrada:</label>
                            <input
                                type="text"
                                id='dataEntrada'
                                className={inputClass}
                                placeholder='Digite a data de entrada (ex: 08/27)'
                                onChange={(e) => setFormData({ ...formData, dataEntrada: e.target.value })} />
                            <br />
                            </div>

                            <button type='submit' className={bottomClass}>Enviar</button>
                        </form>
                        <div className="text-center font-bold" style={{ color: "red" }}>validação</div>

                    </div>
                </div>

            </div>
        </>
    )
}
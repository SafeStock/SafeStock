import { useNavigate } from 'react-router-dom';

export function RegistroUso(formRegistroUso, setFormRegistroUso) {
    const navigate = useNavigate();

    const enviar = (e) => {
        e.preventDefault();
        navigate('/dashboard');
        // enviar para o banco de dados e redirecionar para a tela de produtos
    };

    const inputClass =
    "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none mb-[2vh] "

    const labelClass = "block text-sm font-medium text-gray-600 text-[#2F4672] mb-[0.5rem]";

    const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)]  hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh] mt-[1vh] w-[40%] h-[4.5vh] mx-auto";

    const mainContaner = "flex items-center justify-center h-screen bg-gray-100";
    const container = "w-[21vw] h-[60vh] p-[8vh] bg-white rounded-[30px] shadow-lg p-8 shadow-[3px_3px_8px_rgba(0,0,0,0.3)]";

    const title = "text-2xl font-bold text-center text-[#2F4672] mb-[1.5rem]"

    const form = "flex flex-col gap-6"


    return (
        <>
            <div className={mainContaner}>
                <div className={container}>
                    <h2 className={title}>Registro de uso</h2>
                    <form onSubmit={enviar} className={form}>
                        <div className='content'>
                            <label htmlFor="nome" className={labelClass}>
                                Nome:
                            </label>
                            <input
                                type="text"
                                id="nome"
                                className={inputClass}
                                placeholder="Digite o nome do produto"
                                value={formRegistroUso.nome}
                                onChange={(e) => setFormRegistroUso({ ...formRegistroUso, nome: e.target.value })}
                            />
                        </div>


                        <div className='content'>
                            <label htmlFor="quantidade" className={labelClass}>
                                Quantidade:
                            </label>
                            <input
                                type="text"
                                id="quantidade"
                                className={inputClass}
                                placeholder="Digite a quantidade de produtos"
                                value={formRegistroUso.quantidade}
                                onChange={(e) => setFormRegistroUso({ ...formRegistroUso, quantidade: e.target.value })}
                            />
                        </div>

                        <div className='content'>
                            <label htmlFor="categoria" className={labelClass}>
                                Data de validade:
                            </label>
                            <input
                                type="text"
                                id="categoria"
                                className={inputClass}
                                placeholder="Digite a data de validade do produto (ex: 08/27)"
                                value={formRegistroUso.dataValidade}
                                onChange={(e) => setFormRegistroUso({ ...formRegistroUso, dataValidade: e.target.value })}
                            />
                        </div>

                        <div className='content'>
                            <label htmlFor="categoria" className={labelClass}>
                                Data de retirada:
                            </label>
                            <input
                                type="text"
                                id="categoria"
                                className={inputClass}
                                placeholder="Digite a data de retirada do produto (ex: 08/27)"
                                value={formRegistroUso.dataRetirada}
                                onChange={(e) => setFormRegistroUso({ ...formRegistroUso, dataRetirada: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            className={bottomClass}>
                            Enviar
                        </button>

                    </form>
                    <div className="text-center font-bold" style={{ color: "red" }}>validação</div>
                </div>
            </div>
        </>
    )
}
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

export function CadastroProduto() {
    const [etapa, setEtapa] = useState(1);
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [limiteDeUso, setLimiteDeUso] = useState("");
    const [dataValidade, setDataValidade] = useState("");
    const [dataEntrada, setDataEntrada] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [color, setColor] = useState("");
//    const navigate = useNavigate();

    function formatarData(data) {
        if (!data) return "";
        // Se já estiver no formato correto, retorna
        if (/^\d{4}-\d{2}-\d{2}$/.test(data)) return data;
        // Se vier em outro formato, tenta converter
        const d = new Date(data);
        if (isNaN(d)) return "";
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function validarPrimeiraEtapa() {
        if (!nome.trim() || !categoria.trim() || !quantidade.trim()) {
            setMensagemErro("Preencha todos os campos obrigatórios!");
            setColor("#FF0000");
            return false;
        }
        if (isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
            setMensagemErro("Quantidade deve ser um número positivo");
            setColor("#FF0000");
            return false;
        }
        return true;
    }

    function validarSegundaEtapa() {
        if (!limiteDeUso.trim() || !dataValidade.trim() || !dataEntrada.trim()) {
            setMensagemErro("Preencha todos os campos obrigatórios!");
            setColor("#FF0000");
            return false;
        }
        window.location.reload();
        return true;
        
    }

    function proximo(e) {
        e.preventDefault();
        if (validarPrimeiraEtapa()) {
            setEtapa(2);
            setMensagemErro("");
            setColor("#2F4700");
        }
    }

    function cadastrar(e) {
        e.preventDefault();
        if (validarSegundaEtapa()) {
            const novoProduto = {
                nome: nome.trim(),
                categoriaProduto: categoria,
                quantidade: Number(quantidade),
                limiteSemanalDeUso: Number(limiteDeUso),
                dataValidade: formatarData(dataValidade),
                dataEntrada: formatarData(dataEntrada),
                 crecheId: 1
            };

            console.log(novoProduto);

            fetch('http://localhost:8080/api/produtos/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
                },
                body: JSON.stringify(novoProduto)
            })
                .then(async response => {
                    if (!response.ok) throw new Error('Erro no cadastro');
                    setMensagemErro("Produto cadastrado com sucesso!");
                    setColor("#2F4700");
                    setTimeout(() => window.location.reload(), 2000);
                })
                .catch(error => {
                    console.error(error);
                    setMensagemErro("Erro ao cadastrar produto");
                    setColor("#FF0000");
                });
        }
    }

    const inputClass = "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
    const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh] mt-[1vh] w-[40%] h-[4.5vh] mx-auto";

  const corpoDiv =  "min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden relative";
  const formularioDiv = "flex flex-row items-center justify-center bg-white p-8 rounded-lg shadow-md gap-[10vh]";

    return (
        <div className={corpoDiv}>
            <div className={formularioDiv}>
                {etapa === 1 && (
                    <div
                        className="h-[85vh] w-[65vh]"
                        style={{ animation: "fade-in-right 0.5s ease-out" }}
                    >
                        <form
                            onSubmit={proximo}
                            className="justify-center flex flex-col items-center gap-[2.9vh] text-[#2F4672]"
                        >
                            <h2 className="text-[4vh] font-bold mb-4 m-[1vh]">Cadastro de Produto</h2>
                            <div className="w-5 flex flex-col gap-[1vh] text-[2.5vh]">
                                <p>Nome</p>
                                <input
                                    type="text"
                                    placeholder="Digite o nome do produto"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className={inputClass}
                                />
                                <p className="mt-[3vh]">Categoria</p>
                                <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">Selecione a categoria</option>
                                    <option value="vidros">Vidros</option>
                                    <option value="chao">Chão</option>
                                    <option value="multi_uso">Multi Uso</option>
                                </select>
                                <p className="mt-[3vh]">Quantidade</p>
                                <input
                                    type="number"
                                    placeholder="Digite a quantidade"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <button type="submit" className={bottomClass}>Próximo</button>
                            <div className="w-[35vw] mt-10 text-center text-[2vh]">
                                <span
                                    className={`${mensagemErro ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                                    style={{ color: mensagemErro ? color : "transparent" }}
                                >
                                    {mensagemErro || "mensagem de erro"}
                                </span>
                            </div>
                            <h2 className=" flex justify-center text-center top-[71vh] text-[#2F4672] absolute ">1/2</h2>
                        </form>
                    </div>
                )}

                {etapa === 2 && (
                    <div
                        className="h-[85vh] w-[65vh]"
                        style={{ animation: "fade-in-right 0.5s ease-out" }}
                    >
                        <form
                            onSubmit={cadastrar}
                            className="justify-center flex flex-col items-center gap-[2.9vh] text-[#2F4672]"
                        >
                            <h2 className="text-[4vh] font-bold mb-4 m-[2vh]">Cadastro de Produto</h2>
                            <div className="w-5 flex flex-col gap-[1vh] text-[2.5vh]">
                                <p>Limite de uso</p>
                                <input
                                    type="text"
                                    placeholder="Digite o limite de uso semanal"
                                    value={limiteDeUso}
                                    onChange={(e) => setLimiteDeUso(e.target.value)}
                                    className={inputClass}
                                />
                                <p className="mt-[3vh]">Data de validade</p>
                                <input
                                    type="date"
                                    value={dataValidade}
                                    onChange={(e) => setDataValidade(e.target.value)}
                                    className={inputClass}
                                />
                                <p className="mt-[3vh]">Data de entrada</p>
                                <input
                                    type="date"
                                    value={dataEntrada}
                                    onChange={(e) => setDataEntrada(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <button type="submit" className={bottomClass}>Cadastrar</button>
                            <div className="w-[35vw] mt-10 text-center text-[2vh]">
                                <span
                                    className={`${mensagemErro ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                                    style={{ color: mensagemErro ? color : "transparent" }}
                                >
                                    {mensagemErro || "mensagem de erro"}
                                </span>
                            </div>
                            <h2 className=" flex justify-center text-center top-[71vh] text-[#2F4672] absolute ">2/2</h2>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
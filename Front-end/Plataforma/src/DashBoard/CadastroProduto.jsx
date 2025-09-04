import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export function CadastroProduto() {
    const [etapa, setEtapa] = useState(1);
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [limiteDeUso, setLimiteDeUso] = useState("");
    const [dataValidade, setDataValidade] = useState("");
    const [dataEntrada, setDataEntrada] = useState("");

    function formatarData(data) {
        if (!data) return "";
        if (/^\d{4}-\d{2}-\d{2}$/.test(data)) return data;
        const d = new Date(data);
        if (isNaN(d)) return "";
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function validarPrimeiraEtapa() {
        if (!nome.trim() || !categoria.trim() || !quantidade.trim()) {
            toast.error("Preencha todos os campos obrigatórios!");
            return false;
        }
        if (isNaN(Number(quantidade)) || Number(quantidade) <= 0) {
            toast.error("Quantidade deve ser um número positivo");
            return false;
        }
        return true;
    }

    function validarSegundaEtapa() {
        if (!limiteDeUso.trim() || !dataValidade.trim() || !dataEntrada.trim()) {
            toast.error("Preencha todos os campos obrigatórios!");
            return false;
        }
        return true;
    }

    function proximo(e) {
        e.preventDefault();
        if (validarPrimeiraEtapa()) {
            setEtapa(2);
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
                    toast.success("Produto cadastrado com sucesso!");
                    setTimeout(() => window.location.reload(), 1000);
                })
                .catch(error => {
                    console.error(error);
                    toast.error("Erro ao cadastrar produto");
                });
        }
    }

    const selectClass = "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none h-[5vh]";
    const inputClass = "w-[18vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
    const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh] mt-[1vh] w-[40%] h-[4.5vh] mx-auto";
    const corpoDiv = "min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden relative";
    const formularioDiv = "flex flex-row items-center justify-center bg-white p-8 rounded-lg shadow-md gap-[10vh]";

    return (
        <div className={corpoDiv}>
            
            <div className={formularioDiv}>
                {etapa === 1 && (
    <div className="h-[85vh] w-[65vh]" style={{ animation: "fade-in-right 0.5s ease-out" }}>
        <form onSubmit={proximo} className="flex flex-col justify-center items-center gap-[2.9vh] text-[#2F4672]">
            <h2 className="text-[4vh] font-bold mt-[3vh] mb-[3vh] relative">Cadastro de Produto</h2>
            <div className="w-5 flex flex-col gap-[1vh] text-[2.5vh]">
                <p>Nome</p>
                <input type="text" placeholder="Digite o nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} />
                <p className="mt-[3vh]">Categoria</p>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className={selectClass}>
                    <option value="">Selecione a categoria</option>
                    <option value="vidros">Vidros</option>
                    <option value="chao">Chão</option>
                    <option value="multi_uso">Multi Uso</option>
                </select>
                <p className="mt-[3vh]">Quantidade</p>
                <input type="number" placeholder="Digite a quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} className={inputClass} />
            </div>
            <button type="submit" className={bottomClass}>Próximo</button>
            <h2 className="flex justify-center text-center top-[71vh] text-[#2F4672] absolute">1/2</h2>
        </form>
    </div>
)}

{etapa === 2 && (
    <div className="h-[85vh] w-[65vh]" style={{ animation: "fade-in-right 0.5s ease-out" }}>
        <form onSubmit={cadastrar} className="flex flex-col justify-center items-center gap-[2.9vh] text-[#2F4672]">
            <h2 className="text-[4vh] font-bold mt-[3vh] mb-[3vh] relative">Cadastro de Produto</h2>
            <div className="w-5 flex flex-col gap-[1vh] text-[2.5vh]">
                <p>Limite de uso</p>
                <input type="text" placeholder="Digite o limite de uso semanal" value={limiteDeUso} onChange={(e) => setLimiteDeUso(e.target.value)} className={inputClass} />
                <p className="mt-[3vh]">Data de validade</p>
                <input type="date" value={dataValidade} onChange={(e) => setDataValidade(e.target.value)} className={inputClass} />
                <p className="mt-[3vh]">Data de entrada</p>
                <input type="date" value={dataEntrada} onChange={(e) => setDataEntrada(e.target.value)} className={inputClass} />
            </div>
            <button type="submit" className={bottomClass}>Cadastrar</button>
            <h2 className="flex justify-center text-center top-[71vh] text-[#2F4672] absolute">2/2</h2>
        </form>
    </div>
)}

            </div>
        </div>
    );
}

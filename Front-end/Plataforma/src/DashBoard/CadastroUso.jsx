import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export function CadastroUso({ fecharModal }) {
  const [etapa, setEtapa] = useState(1);
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataUso, setDataUso] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const [produtos, setProdutos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  
  // Buscar produtos e funcionários de limpeza
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    fetch("http://localhost:8080/api/produtos", {
      headers: { Authorization: "Bearer " + token },
    })
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao buscar produtos:", err));

    fetch("http://localhost:8080/api/funcionarios?cargo=limpeza", {
      headers: { Authorization: "Bearer " + token },
    })
      .then(res => res.json())
      .then(data => setFuncionarios(data))

      .catch(err => console.error("Erro ao buscar funcionários:", err));
  }, []);

  function validarPrimeiraEtapa() {
    if (!produto || !quantidade.trim()) {
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
    if (!dataUso.trim() || !responsavel) {
      toast.error("Preencha todos os campos obrigatórios!");
      return false;
    }
    return true;
  }

  function proximo(e) {
    e.preventDefault();
    if (validarPrimeiraEtapa()) setEtapa(2);
  }

  function cadastrar(e) {
    e.preventDefault();
    if (!validarSegundaEtapa()) return;

   const novoUso = {
  produto: produtos.find(p => p.id === Number(produto))?.nome || "",
  quantidade: Number(quantidade),
  dataHoraSaida: new Date().toISOString(), // se quiser mandar agora
  funcionario: { id: Number(responsavel), nome: funcionarios.find(f => f.id === Number(responsavel))?.nome || "" }
};


    fetch('http://localhost:8080/api/registroUso/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
      },
      body: JSON.stringify(novoUso),
      
    })

      .then(async response => {
        console.log(novoUso);
        if (!response.ok) throw new Error('Erro no cadastro');
        toast.success("Registro cadastrado com sucesso!");
        if (fecharModal) fecharModal();
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(error => {
        console.error(error);
        toast.error("Erro ao registrar uso");
      });
  }

  const inputClass = "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
  const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mt-[5vh] w-[40%] h-[4.5vh] mx-auto";
  const corpoDiv = "min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden relative";
  const formularioDiv = "flex flex-row items-center justify-center bg-white p-8 rounded-lg shadow-md gap-[10vh]";

  return (
    <div className={corpoDiv}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={formularioDiv}>
        {etapa === 1 && (
          <div className="h-[85vh] w-[65vh]" style={{ animation: "fade-in-right 0.5s ease-out" }}>
            <form onSubmit={proximo} className="justify-center flex flex-col items-center gap-[2.9vh] text-[#2F4672]">
              <h2 className="text-[4vh] font-bold mb-4 m-[1vh]">Registro de Uso</h2>
              <div className=" flex flex-col gap-[3vh] text-[2.5vh]">
                <p>Produto</p>
                <select value={produto} onChange={(e) => setProduto(e.target.value)} className={inputClass}>
                  <option value="">Selecione o produto</option>
                  {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
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
            <form onSubmit={cadastrar} className="justify-center flex flex-col items-center gap-[2.9vh] text-[#2F4672]">
              <h2 className="text-[4vh] font-bold mb-4 m-[2vh]">Registro de Uso</h2>
              <div className="w-5 flex flex-col gap-[3vh] text-[2.5vh]">
                <p>Data do uso</p>
                <input type="date" value={dataUso} onChange={(e) => setDataUso(e.target.value)} className={inputClass} />
                <p className="mt-[3vh]">Responsável</p>
                <select value={responsavel} onChange={(e) => setResponsavel(e.target.value)} className={inputClass}>
                  <option value="">Selecione o responsável</option>
                  {funcionarios.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
                </select>
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

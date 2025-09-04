import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export function CadastroUso({ fecharModal }) {
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataUso, setDataUso] = useState("");
  const [produtos, setProdutos] = useState([]);




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


      .catch(err => console.error("Erro ao buscar funcionários:", err));
  }, []);

  const recarregar = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

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

  function cadastrar(e) {
    e.preventDefault();
    if (!validarPrimeiraEtapa()) return;

    const usuarioId = sessionStorage.getItem("usuarioId");
    console.log(usuarioId);

    const novoUso = {
      produto: produtos.find(p => p.id === Number(produto))?.nome || "",
      quantidade: Number(quantidade),
      dataHoraSaida: dataUso ? new Date(dataUso).toISOString() : new Date().toISOString(),
      funcionarioId: Number(sessionStorage.getItem("usuarioId"))
    };


    console.log(novoUso);

    fetch('http://localhost:8080/api/registroUso/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
      },
      body: JSON.stringify(novoUso),
    })
      .then(response => {
        if (!response.ok) throw new Error('Erro no cadastro');
        toast.success("Registro registrado com sucesso!");
        recarregar();
        if (fecharModal) fecharModal();
      })
      .catch(error => {
        console.error(error);
        toast.error("Erro ao registrar uso");
      });
  }


  const selectClass = "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
  const inputClass = "w-[18vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
  const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mt-[5vh] w-[40%] h-[4.5vh] mx-auto";
  const corpoDiv = "min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden relative";
  const formularioDiv = "flex flex-row items-center justify-center bg-white p-8 rounded-lg shadow-md gap-[10vh]";

  return (
    <div className={corpoDiv}>
      <div className={formularioDiv}>

        <div className="h-[85vh] w-[65vh]" style={{ animation: "fade-in-right 0.5s ease-out" }}>
          <form onSubmit={cadastrar} className="flex flex-col justify-center items-center gap-[2.9vh] text-[#2F4672]">
            <h2 className="text-[4vh] font-bold mt-[3vh] mb-[3vh]">Registro de Uso</h2>

            <div className="w-5 flex flex-col gap-[1vh] text-[2.5vh]">
              <p>Produto</p>
              <select value={produto} onChange={(e) => setProduto(e.target.value)} className={selectClass}>
                <option value="">Selecione o produto</option>
                {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>

              <p className="mt-[3vh]">Quantidade</p>
              <input
                type="number"
                placeholder="Digite a quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className={inputClass}
              />

              <p className="mt-[3vh]">Data do uso</p>
              <input
                type="date"
                value={dataUso}
                onChange={(e) => setDataUso(e.target.value)}
                className={inputClass}
              />
            </div>

            <button type="submit" className={bottomClass}>Resgitrar</button>

          </form>
        </div>

      </div>
    </div>
  );
}

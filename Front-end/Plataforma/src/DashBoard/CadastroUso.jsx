import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function CadastroUso({ fecharModal }) {
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");

    fetch("http://localhost:8080/api/produtos", {
      headers: { Authorization: "Bearer " + token },
    })
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error("Erro ao buscar produtos:", err));
  }, []);

  const recarregar = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  function getDataHoraLocal() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");

    return `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
  }


  function validarEtapa1() {
    const quantidadeNum = Number(quantidade);
    const produtoSelecionado = produtos.find(p => p.id === Number(produto));

    if (!produto || !quantidade.trim()) {
      toast.error("Preencha todos os campos obrigatórios!");
      return false;
    }

    if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
      toast.error("Quantidade deve ser um número positivo");
      return false;
    }

    if (!produtoSelecionado) {
      toast.error("Produto não encontrado.");
      return false;
    }

    if (produtoSelecionado.quantidade < quantidadeNum) {
      toast.warning(`Estoque insuficiente para ${produtoSelecionado.nome}. Disponível: ${produtoSelecionado.quantidade}`);
      return false;
    }

    return true;
  }

  function cadastrar(e) {
    e.preventDefault();
    if (!validarEtapa1()) return;

    const quantidadeNum = Number(quantidade);
    const produtoSelecionado = produtos.find(p => p.id === Number(produto));

    const novoUso = {
      produto: produtoSelecionado.nome,
      quantidade: quantidadeNum,
      dataHoraSaida: getDataHoraLocal(),
      funcionarioId: Number(sessionStorage.getItem("usuarioId"))
    };


    fetch(`http://localhost:8080/api/produtos/atualizar/${produtoSelecionado.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
      },
      body: JSON.stringify({
        ...produtoSelecionado,
        quantidade: produtoSelecionado.quantidade - quantidadeNum
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar estoque");

        // Registra o uso
        return fetch('http://localhost:8080/api/registroUso/cadastro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
          },
          body: JSON.stringify(novoUso),
        });
      })
      .then(response => {
        if (!response.ok) throw new Error('Erro no cadastro de uso');
        toast.success("Uso registradado com sucesso!");
        recarregar();
        if (fecharModal) fecharModal();
      })
      .catch(error => {
        console.error(error);
        toast.warning("Não é possível retirar todos os produtos de uma vez!");
      });
  }

  // Estilos
  const selectClass = "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
  const inputClass = "w-[18vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
  const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh] mt-[5vh] w-[40%] h-[4.5vh] mx-auto";
  const corpoDiv = "min-h-screen flex items-center justify-center bg-gray-100";
  const formularioDiv = "flex flex-row items-center justify-center bg-white p-8 rounded-lg shadow-md gap-[10vh]";

  return (
    <div className={corpoDiv}>
      <div className={formularioDiv}>
        <div className="h-[85vh] w-[65vh]">
          <form onSubmit={cadastrar} className="flex flex-col justify-center items-center gap-[2.9vh] text-[#2F4672]">
            <h2 className="text-[4vh] font-bold mt-[3vh] mb-[3vh]">Registro de Uso</h2>

            <div className="flex flex-col gap-[1vh] text-[2.5vh]">
              <p>Produto</p>
              <select value={produto} onChange={(e) => setProduto(e.target.value)} className={selectClass}>
                <option value="">Selecione o produto</option>
                {produtos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nome} (Disponível: {p.quantidade})
                  </option>
                ))}
              </select>

              <p className="mt-[6vh]">Quantidade</p>
              <input
                type="number"
                placeholder="Digite a quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className={inputClass}
              />

            </div>

            <button type="submit" className={bottomClass}>Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export function ProdutosInformation({ abrirModal }) {
  const [produtos, setProdutos] = useState([]);

  const buscarProdutos = () => {
  fetch("http://localhost:8080/api/produtos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return res.json();
    })
    .then((data) => setProdutos(data))
    .catch((err) => console.error(err));
};

useEffect(() => {
  buscarProdutos();
}, []);

const confirmarExclusao = (id) => {
  const confirmacao = window.confirm("Deseja excluir este produto?");
  if (confirmacao) {
    fetch(`http://localhost:8080/api/produtos/deletar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir produto");
        alert("Produto excluído com sucesso!");
        buscarProdutos();
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao excluir produto.");
      });
  }
};

  const formatarData = (dataStr) => {
    if (!dataStr) return "N/A";
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <div className="h-[60vh] w-[87vw] flex flex-col items-center overflow-y-auto scrollbar-custom p-[0.8vh]">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="h-[12vh] w-[83vw] flex flex-row justify-start items-center shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-white rounded-[20px] my-2"
        >
          <img
            src="/src/assets/ProductIcon.svg"
            className="h-[6vh] w-[3vw] ml-[5vh]"
            alt="Produto"
          />

          <div className="h-full w-[52vw] flex flex-row justify-center items-center text-[2vh] text-[#3A577B] ml-[2vw]">
            <div className="w-[16%] flex justify-center">{produto.nome}</div>
            <div className="w-[16%] flex justify-center">{produto.categoria}</div>
            <div className="w-[16%] flex justify-center">{produto.quantidade}</div>
            <div className="w-[16%] flex justify-center">{produto.limite}</div>
            <div className="w-[16%] flex justify-center">{formatarData(produto.dataValidade)}</div>
            <div className="w-[16%] flex justify-center">{formatarData(produto.dataEntrada)}</div>
          </div>

          <div className="h-full w-[6vw] flex flex-row justify-center items-center gap-[1vh] mr-[2vw]">
            <button
              onClick={abrirModal}
              className="h-[4.9vh] w-[2.5vw] flex justify-center items-center"
            >
              <img src="/src/assets/ModifyUser.svg" className="h-[4.8vh] w-[2.4vw]" />
            </button>
            <button
              onClick={() => confirmarExclusao(produto.id)}
              className="h-[4.9vh] w-[2.5vw] flex justify-center items-center"
            >
              <img src="/src/assets/RemoveUser.svg" className="h-[4.6vh] w-[2.3vw]" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

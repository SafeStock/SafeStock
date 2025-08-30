import { useState } from "react";

export function CadastroUso({ fecharModal }) {
  const [etapa, setEtapa] = useState(1);
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [dataUso, setDataUso] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [color, setColor] = useState("");

  function validarPrimeiraEtapa() {
    if (!produto.trim() || !quantidade.trim()) {
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
    if (!dataUso.trim() || !responsavel.trim()) {
      setMensagemErro("Preencha todos os campos obrigatórios!");
      setColor("#FF0000");
      return false;
    }
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
      const novoUso = {
        produto: produto.trim(),
        quantidade: Number(quantidade),
        dataUso: dataUso.trim(),
        responsavel: responsavel.trim(),
      };

      fetch('http://localhost:8080/api/uso/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(novoUso)
      })
        .then(async response => {
          if (!response.ok) throw new Error('Erro no cadastro');
          setMensagemErro("Registro de uso cadastrado com sucesso!");
          setColor("#2F4700");
          setTimeout(() => {
            if (fecharModal) fecharModal();
            window.location.reload();
          }, 1500);
        })
        .catch(() => {
          setMensagemErro("Erro ao cadastrar registro de uso");
          setColor("#FF0000");
        });
    }
  }

  const inputClass = "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
  const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh] mt-[1vh] w-[40%] h-[4.5vh] mx-auto";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden relative">
      <div className="flex flex-row items-center justify-center bg-white p-8 rounded-lg shadow-md gap-[10vh]">
        {etapa === 1 && (
          <div
            className="h-[85vh] w-[65vh]"
            style={{ animation: "fade-in-right 0.5s ease-out" }}
          >
            <form
              onSubmit={proximo}
              className="justify-center flex flex-col items-center gap-[2.9vh] text-[#2F4672]"
            >
              <h2 className="text-[4vh] font-bold mb-4 m-[2vh]">Registro de Uso</h2>
              <div className="w-[80%] flex flex-col gap-[1vh] text-[2.5vh]">
                <p>Produto</p>
                <input
                  type="text"
                  placeholder="Digite o nome do produto"
                  value={produto}
                  onChange={(e) => setProduto(e.target.value)}
                  className={inputClass}
                />
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
              <div className="w-[35vh] mt-2 text-center text-[2vh]">
                <span
                  className={`${mensagemErro ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                  style={{ color: mensagemErro ? color : "transparent" }}
                >
                  {mensagemErro || "mensagem de erro"}
                </span>
              </div>
              <h2 className="flex justify-end top-[80vh] w-[35%] text-[#2F4672] absolute mr-[12rem]">1/2</h2>
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
              <h2 className="text-[4vh] font-bold mb-4 m-[2vh]">Registro de Uso</h2>
              <div className="w-5 flex flex-col gap-[1vh] text-[2.5vh]">
                <p>Data do uso</p>
                <input
                  type="date"
                  value={dataUso}
                  onChange={(e) => setDataUso(e.target.value)}
                  className={inputClass}
                />
                <p className="mt-[3vh]">Responsável</p>
                <input
                  type="text"
                  placeholder="Digite o nome do responsável"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
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
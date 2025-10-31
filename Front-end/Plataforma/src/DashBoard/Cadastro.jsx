import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export function Cadastro() {
  const [etapa, setEtapa] = useState(1);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function validarPrimeiraEtapa() {
    if (!nome.trim()) {
      toast.error("Nome é obrigatório");
      return false;
    }
    if (!sobrenome.trim()) {
      toast.error("Sobrenome é obrigatório");
      return false;
    }
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (!telefoneLimpo || telefoneLimpo.length !== 11) {
      toast.error("O telefone deve conter exatamente 11 números");
      return false;
    }
    return true;
  }

  function validarSegundaEtapa() {
    if (!cargo.trim()) {
      toast.error("Cargo é obrigatório");
      return false;
    }
    if (!["dono", "secretaria", "limpeza"].includes(cargo.toLowerCase())) {
      toast.error("Cargo inválido");
      return false;
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.trim())) {
      toast.error("Email inválido");
      return false;
    }
    if (!senha.trim()) {
      toast.error("Senha é obrigatória");
      return false;
    }
    const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    if (!regexEspecial.test(senha)) {
      toast.error("A senha deve conter pelo menos um caractere especial ");
      return false;
    }
    return true;
  }

  function proximo(e) {
    e.preventDefault();
    if (validarPrimeiraEtapa()) {
      setTimeout(() => {
        setEtapa(2);
      }, 500); // animação curta
    }
  }
  const recarregar = () => {
    // Recarrega a página para garantir atualização dos dados
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  function cadastrar(e) {
    e.preventDefault();
    if (validarSegundaEtapa()) {
      const cargoMap = {
        dono: 0,
        secretaria: 1,
        limpeza: 2
      };

      const novoUsuario = {
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
        cargo: cargoMap[cargo.trim().toLowerCase()],
        telefone: telefone.trim(),
        email: email.trim().toLowerCase(),
        senha: senha.trim(),
        creche: [null]
      };

      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/funcionarios/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(novoUsuario)
      })
        .then(async response => {
          const text = await response.text(); // lê a resposta do servidor
          if (!response.ok) {
            throw new Error(text || 'Erro no cadastro');
          }
          return text ? JSON.parse(text) : {};
        })
        .then(() => {
          toast.success("Cadastro realizado com sucesso!");
          recarregar();
        })
        .catch(error => {
          console.error("Erro no cadastro:", error);
          // verifica se a mensagem de erro contém algo sobre duplicidade de e-mail
          if (error.message.includes("Unique index") || error.message.includes("já cadastrado")) {
            toast.error("Erro: usuário já cadastrado!");
          } else {
            toast.error("Erro ao cadastrar usuário");
          }
        });
    }
  }

  const selectClass = "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none h-[5vh]";
  const inputClass = "w-[18vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none";
  const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh] mt-[1vh] w-[40%] h-[4.5vh] mx-auto";
  const corpoDiv = "min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden relative";
  const formularioDiv = "flex flex-row items-center justify-center bg-white p-8 rounded-lg shadow-md gap-[10vh] ";

  return (
    <div className={corpoDiv}>
      <div className={formularioDiv}>
        {etapa === 1 && (
          <div className="h-[85vh] w-[65vh]" style={{ animation: "fade-in-right 0.5s ease-out" }}>
            <form onSubmit={proximo} className="flex flex-col justify-center items-center gap-[2.9vh] text-[#2F4672]">
              <h2 className="text-[4vh] font-bold mt-[3vh] mb-[3vh]">Cadastro</h2>

              <div className="w-5 flex flex-col gap-[1vh] text-[2.5vh]">
                <p>Nome</p>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputClass}
                />

                <p className="mt-[3vh]">Sobrenome</p>
                <input
                  type="text"
                  placeholder="Digite seu sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  className={inputClass}
                />

                <p className="mt-[3vh]">Telefone</p>
                <input
                  type="number"
                  placeholder="11978547874"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className={inputClass}
                />
              </div>

              <button type="submit" className={bottomClass}>Próximo</button>
              <h2 className="flex justify-center text-center top-[71vh] text-[#2F4672] absolute">1/2</h2>
            </form>
          </div>
        )}


        {etapa === 2 && (
          <div className="h-[85vh] w-[65vh] animate-fadeInContent" >
            <form onSubmit={cadastrar} className="flex flex-col justify-center items-center gap-[2.9vh] text-[#2F4672]">
              <h2 className="text-[4vh] font-bold mt-[3vh] mb-[3vh]">Cadastro</h2>

              <div className="w-5 flex flex-col gap-[1vh] text-[2.5vh]">
                <p>Cargo</p>
                <select value={cargo} onChange={(e) => setCargo(e.target.value)} className={selectClass}>
                  <option value="">Selecione o tipo de usuário</option>
                  <option value="secretaria">Secretária</option>
                  <option value="limpeza">Equipe de Limpeza</option>
                </select>

                <p className="mt-[3vh]">Email</p>
                <input
                  type="text"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />

                <p className="mt-[3vh]">Senha</p>
                <input
                  type="password"
                  placeholder="******"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={inputClass}
                />
              </div>

              <button type="submit" className={bottomClass}>Cadastrar</button>
              <h2 className="flex justify-center text-center top-[64vh] text-[#2F4672] absolute">2/2</h2>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

import { useState } from "react";
// import { useNavigate } from 'react-router-dom';


export function Cadastro() {

  const [etapa, setEtapa] = useState(1);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [color, setColor] = useState("");
  // const [display, setDisplay] = useState(false);

  // const [carregando, setCarregando] = useState(false);


  function validarPrimeiraEtapa() {
    if (!nome.trim()) {
      setMensagemErro("Nome é obrigatório");
      setColor("#FF0000");
      return false;
    }
    if (!sobrenome.trim()) {
      setMensagemErro("Sobrenome é obrigatório");
      setColor("#FF0000");
      return false;
    }
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (!telefoneLimpo || telefoneLimpo.length !== 11) {
      setMensagemErro("O telefone deve conter exatamente 11 números");
      setColor("#FF0000");
      return false;
    }
    return true;
  }

  function validarSegundaEtapa() {
    if (!cargo.trim()) {
      setMensagemErro("Cargo é obrigatório");
      setColor("#FF0000");
      return false;
    }
    if (cargo.toLowerCase() !== "dono" && cargo.toLowerCase() !== "secretaria" && cargo.toLowerCase() !== "limpeza") {
      setMensagemErro("Cargo inválido");
      setColor("#FF0000");
      return false;
    }
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.trim())) {
      setMensagemErro("Email inválido");
      setColor("#FF0000");
      return false;
    }
    if (!senha.trim()) {
      setMensagemErro("Senha é obrigatória");
      setColor("#FF0000");
      return false;
    }
    return true;
  }



  function proximo(e) {
    e.preventDefault();
    if (validarPrimeiraEtapa()) {
      setTimeout(() => {
        setEtapa(2);
        setMensagemErro("");
        setColor("#2F4700");
      }, 2000);

    } else {
      setMensagemErro("Preencha os campos obrigatórios");
      setColor("#FF0000")
    }
  }

  const recarregar = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
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
        cargo: cargoMap[cargo.trim().toLowerCase()], // converte string para número
        telefone: telefone.trim(),
        email: email.trim().toLowerCase(),
        senha: senha.trim(),
        creche: [null] // ou talvez o ID da creche, se você tiver
      };

      fetch('http://localhost:8080/api/funcionarios/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('authToken')
        },
        body: JSON.stringify(novoUsuario)
      })
        .then(async response => {
          if (!response.ok) throw new Error('Erro no cadastro');

          const text = await response.text();
          return text ? JSON.parse(text) : {};
        })
        .then(() => {
          setMensagemErro("Cadastro realizado com sucesso!");
          setColor("#2F4700");
          recarregar();
        })
        .catch(error => {
          console.error(error);
          setMensagemErro("Erro ao cadastrar usuário");
          setColor("#FF0000");
        });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden relative">
      <div className="flex flex-row items-center justify-center bg-white p-8 rounded-lg shadow-md gap-[10vh]">
        {/* Formulário 1 */}
        {etapa === 1 && (
          <div
            className="h-[65vh] w-[68vh] rounded-[30px] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] p-[5vh]"
            style={{ animation: "fade-in-right 0.5s ease-out" }}
          >
            <form
              onSubmit={proximo}
              className="justify-center flex flex-col items-center gap-[3.5vh] text-[#2F4672]"
            >
              <h2 className="text-[4vh] font-bold mb-4 m-[2vh]">Cadastro</h2>
              <div className="w-[80%] flex flex-col gap-[1vh] text-[2.5vh]">
                <p>Nome</p>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none 
                  focus:border-[#2F4672] transition-colors duration-200"
                />
                <p className="mt-[3vh]">Sobrenome</p>
                <input
                  type="text"
                  placeholder="Digite seu Sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  className="w-full p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none 
                  focus:border-[#2F4672] transition-colors duration-200"
                />
                <p className="mt-[3vh]">Telefone</p>
                <input
                  type="number"
                  placeholder="1140020922"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none 
                  focus:border-[#2F4672] transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className="text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[1.5vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] w-[50%]
                              hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200 "
              >
                Próximo
              </button>

              <div>

              </div>

              {/* Mensagem de erro */}
              <div className="w-[35vh] mt-2 text-center text-[2vh]">

                `{console.log(color)}

                <span
                  className={`${mensagemErro ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                  style={{ color: mensagemErro ? color : "transparent" }}
                >
                  {mensagemErro || "mensagem de erro"}
                </span>
              </div>

              <h2 className="flex justify-end top-[80vh] w-[35%] text-[#2F4672] absolute">1/2</h2>
            </form>
          </div>
        )}

        {/* Formulário 2 */}
        {etapa === 2 && (
          <div
            className="h-[65vh] w-[68vh] rounded-[30px] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] p-[5vh]"
            style={{ animation: "fade-in-right 0.5s ease-out" }}
          >
            <form
              onSubmit={cadastrar}
              className="justify-center flex flex-col items-center gap-[3.5vh] text-[#2F4672]"
            >
              <h2 className="text-[4vh] font-bold mb-4 m-[2vh]">Cadastro</h2>
              <div className="w-[80%] flex flex-col gap-[1vh] text-[2.5vh]">
                <p>Cargo</p>
                <select
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none
                  focus:border-[#2F4672] transition-colors duration-200"
                >
                  <option value="">Selecione o tipo de usuário</option>
                  <option value="dono">Dono</option>
                  <option value="secretaria">Secretária</option>
                  <option value="limpeza">Equipe de Limpeza</option>
                </select>

                <p className="mt-[3vh]">Email</p>
                <input
                  type="text"
                  placeholder="Digite seu Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none 
                  focus:border-[#2F4672] transition-colors duration-200"
                />
                <p className="mt-[3vh]">Senha</p>
                <input
                  type="password"
                  placeholder="******"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="'w-full p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none 
                  focus:border-[#2F4672] transition-colors duration-200"
                />
              </div>
              <button
                type="submit"
                className="text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[1.5vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] w-[50%]
                          hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200"
              >
                Cadastrar
              </button>

              {/* Mensagem de erro */}
              <div className="w-[35vh] mt-2 text-center text-[2vh]">
                <span
                  className={`${mensagemErro ?
                    "opacity-100" : "opacity-0"}
                    transition-opacity duration-300`}
                  style={{ color: mensagemErro ? color : "transparent" }}>

                  {mensagemErro || "mensagem de erro"}
                </span>
              </div>

              <h2 className="flex justify-end w-[100%] text-[#2F4672]">2/2</h2>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}

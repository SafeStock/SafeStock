import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import imagemLogin from "../assets/imagemLogin.svg";
import imagemObjeto from "../assets/ComponentOfLoginCadastro.svg";
import logo from "../assets/LogocomNome.svg";
import Animation from "../lotties/Animation - 1745693504754.json";
import Lottie from "lottie-react";



export function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [color, setColor] = useState("");
  const [star, setStar] = useState("");
  const [carregando, setCarregando] = useState(false);


  const irParaTelaFuncionarios = () => {
    setTimeout(() => {
      navigate('/dashboard/telafuncionarios');
    }, 2200);  
  };

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };


  async function login(e) {
    e.preventDefault();
  
    if (!email || !senha) {
      setMensagemErro("Preencha todos os campos obrigatórios");
      setColor("#FF0000");
      setStar('*');
      return;
    }
  
    if (!validarEmail(email)) {
      setMensagemErro("Email inválido");
      setColor("#FF0000");
      setStar('*');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/funcionarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha.trim(),
        }),
      });
    
      if (!response.ok) {
        throw new Error('Login falhou');
      }
    
      const data = await response.json();
    
      // 💾 Salvar o token e o nome no sessionStorage
      if (data.token) {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('usuario', data.nome);
        sessionStorage.setItem('cargo', data.cargo); // ajuste se seu back devolver o nome assim
      }
    
      console.log(data); // aqui você vê o que chegou da API
      setMensagemErro(`Login realizado com sucesso!`);
      setColor("#2F4700");
      setStar('');
      setCarregando(true);
      setEmail(""); // limpa campos
      setSenha("");
      irParaTelaFuncionarios();
    
    } catch (error) {
      console.error(error);
      setMensagemErro("Credenciais inválidas ou erro no servidor");
      setColor("#FF0000");
      setStar('*');
    }
  }

  return (
    <div className="flex flex-row w-full h-screen bg-gray-100 justify-center items-center relative overflow-hidden">

      <main className="flex flex-column justify-center items-center absolute mr-[26vw] max-w-[1200px]">


        <div className="h-[63vh]  w-[35.6vw] rounded-[30px] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] p-[5.5vh] ">
          {!carregando ? (
            <>
              <header className="mb-6 text-center">
                <h1 className="text-[4vh] font-bold m-[2vh] text-[#2F4672] mb-[9vh]">Entrar</h1>
              </header>

              <form onSubmit={login} className="flex flex-col items-center justify-center text-[#2F4672] gap-[5vh] text-[2.5vh]">
                <div className="flex flex-col  justify-center gap-[0.5vh]">
                  <p className="text-sm font-medium text-gray-600 mb-1">E-mail</p>
                  <input
                    type="text"
                    placeholder="emailexemplo@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[28vw] p-[1.5vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none mb-[2vh] "
                  />

                  <h2 className=" flex justify-end left-[80%] absolute  top-[35%]">
                    <span className={`${star ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300`} style={{ color: star ? color : "transparent" }}>{star}</span>
                  </h2>

                  <p className="text-sm  font-medium text-gray-600 ">Senha</p>
                  <input
                    type="password"
                    placeholder="******"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-[28vw] p-[1.5vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none "
                  />
                  <h2 className=" flex justify-end left-[80%] absolute  top-[49.5%]">
                    <span className={`${star ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300`} style={{ color: star ? color : "transparent" }}>{star}</span>
                  </h2>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] w-[30%]
              hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh]"
                >
                  Enviar
                </button>
              </form>

              <div className="mt-4 text-sm text-center text-gray-600 ">
                <p>
                  Esqueceu sua{" "}
                  <button className="te xt-blue-500 border-none bg-[rgba(0,0,0,0)] cursor-pointer   hover:text-[#2F4772] hover:text-[#2F4690] transition-colors duration-500 mb-[2vh]">Senha</button>?
                </p>

              </div>

              <div className="text-[2.5vh] w-[100%] flex justify-center">
                <span
                  className={`${mensagemErro ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                  style={{ color: mensagemErro ? color : "transparent" }}
                >
                  {mensagemErro || "mensagem de erro"}
                </span>
              </div>

            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full ">
              <Lottie
                animationData={Animation}
                loop
                autopla
              />

            </div>

          )}
        </div>
      </main>



      <section className="flex-1 flex items-center justify-center p-10 absolute ml-[45vw] max-w-[350px] z-10">
        <img
          src={imagemLogin}
          alt="Imagem de login"
          className="max-w-full w-full h-auto"
        />
      </section>

      <section className="w-[100vw] h-[101vh] ml-[70vw] absolute z-[-1]">
        <img
          src={imagemObjeto}
          alt="Objeto de Login"
          className="w-full h-full" />
      </section>

      <section className="absolute top-0 left-0 w-[3vw] h-[6vh] z-[-1] mb-[88vh] mr-[90vw]">
        <img
          src={logo}
          alt="Logo"
          className="absolute top-0 left-0 w-[3w] h-[6vh]"
        />
      </section>

    </div>
  );
}



import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imagemLogin from "../assets/imagemLogin.svg";

export function Login() {

  const navigate = useNavigate();  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const irParaCadastro = () => {
    navigate('/cadastro')
}

function login(e) {
    e.preventDefault()
    
    console.log("Email:", email)
    console.log("Senha:", senha)
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <main className="flex-1 flex items-center justify-center text-[#2F4672] p-10 ml-[10vw]">

        <div className="h-[40vh] w-[30vw] rounded-[30px] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] p-[5vh]">

          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 m-[2vh]">Entrar</h1>
          </header>

          <form onSubmit={login} className="flex flex-col items-center justify-center">
            <div className="flex flex-col  justify-center gap-[1vh]">
              <p className="text-sm font-medium text-gray-600 mb-1">E-mail</p>
              <input
                type="text"
                placeholder="emailexemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[25vw] p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none "
              />
            
              <p className="text-sm font-medium text-gray-600 mb-1">Senha</p>
              <input
                type="password"
                placeholder="******"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-[25vw] p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none "
              />
            </div>

            <button
              type="submit"
              className="text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] w-[30%]
              hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200"
            >
              Enviar
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-gray-600">
            <p>
              Esqueceu sua{" "}
              <button className="text-blue-500 underline border-none bg-[white] text-[#2F4672] pointer hover:text-[#2F4690]">Senha</button>?
            </p>

            Não tem uma conta?<button className="text-blue-500 underline border-none bg-[white] text-[#2F4672] pointer hover:text-[#2F4772]" onClick={irParaCadastro}><b>Cadastre-se</b></button>
          </div>

        </div>
      </main>

      <section className="flex-1 flex items-center justify-center p-10">
        <img
          src={imagemLogin}
          alt="Imagem de login"
          className="max-w-[350px] w-full h-auto"
        />
      </section>
      
    </div>
  );
}

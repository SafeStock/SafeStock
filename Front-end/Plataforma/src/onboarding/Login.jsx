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
    <div className="flex flex-row w-full h-screen bg-gray-100">
      
      <main className="flex-1 flex items-center justify-center">

        <div className="bg-white border border-gray-300 p-8 rounded-xl shadow-lg w-[450px] h-[250px]">

          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Entrar</h1>
          </header>

          <form onSubmit={login} className="flex flex-col items-center justify-center">
            <div className="flex flex-col  justify-center">
              <p className="text-sm font-medium text-gray-600 mb-1">E-mail</p>
              <input
                type="text"
                placeholder="emailexemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[23vw] h-[5vh] px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            
              <p className="text-sm font-medium text-gray-600 mb-1">Senha</p>
              <input
                type="password"
                placeholder="******"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-[23vw] h-[5vh] px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-[170px] text-white py-2 rounded-md mt-6 hover:bg-blue-700 text-sm"
            >
              Enviar
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-gray-600">
            <p>
              Esqueceu sua{" "}
              <button className="text-blue-500 hover:underline">Senha?</button>
            </p>

            <button className="Redirecionar" onClick={irParaCadastro}> Não tem Cadastro?</button>
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

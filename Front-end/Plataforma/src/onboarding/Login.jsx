import { useState } from "react";
import imagemLogin from "../assets/imagemLogin.svg";

export function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function login() {
        
    }

    return (
        <div className='< flex flex-row w-full h-screen bg-[#ff5733]'>
            <section class="areaImagemCadastro">
            <img src={imagemLogin} alt="Imagem de login" />
            </section>

            <main>

                <header>
                    <h1>Entrar</h1>
                </header>

                <section>
                    <form action="">

                        <p>E-mail</p>
                        <input 
                        type="text" 
                        placeholder="emailexemplo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <p>Senha</p>
                        <input 
                        type="text" 
                        placeholder="******"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        />

                        <button onClick={login}>Enviar</button>
                    </form>
                </section>

                <div></div>
                
                <p>Esqueceu sua <button class="Redirecionar" id="Redirecionar1">Senha?</button></p>

                <p>Não tem uma Conta? <button class="Redirecionar"><a href="index-cadastro.html">Cadastre-se</a></button></p>

            </main>

    </div>
    )
}
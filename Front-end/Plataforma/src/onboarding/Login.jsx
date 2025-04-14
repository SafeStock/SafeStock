import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import imagemLogin from "../assets/imagemLogin.svg";
import { Link } from "react-router-dom"; // Se estiver usando react-router-dom

export function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const irParaCadastro = () => {
        navigate('/cadastro')
    }

    function login(e) {
        e.preventDefault()
        // lógica de autenticação aqui
        console.log("Email:", email)
        console.log("Senha:", senha)
    }

    return (
        <div className="flex flex-row w-full h-screen">
            <section className="areaImagemCadastro">
                <img src={imagemLogin} alt="Imagem de login" />
            </section>

            <main>
                <header>
                    <h1>Entrar</h1>
                </header>

                <section>
                    <form>
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

                <p>Esqueceu sua <button className="Redirecionar">Senha?</button></p>

                <button className="Redirecionar" onClick={irParaCadastro}>💠</button>
            </main>
        </div>
    )
}

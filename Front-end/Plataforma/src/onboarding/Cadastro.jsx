import { useState } from "react";
import ImagemCadastro from "../assets/imagemCadastro.svg";

export function Cadastro() {

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [telefone, setTelefone] = useState("");

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("")

    return (
        <div>
            <section class="areaImagemCadastro">
            <img src={ImagemCadastro} alt="Imagem de login" />
            </section>

            <main>

                <header>
                    <h1>Cadastro</h1>
                </header>

                <section>
                    <form action="">
                        <input 
                        type="text" 
                        placeholder="Maria"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        />
                        <input 
                        type="text" 
                        placeholder="Gomes da Silva"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                        />
                        <input 
                        type="text" 
                        placeholder="11020406080"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        />
                        <button>Próximo</button>
                    </form>
                </section>

                <section>
                    <form action="">
                        <select name="" id="">

                        </select>
                        <input 
                        type="text" 
                        placeholder="emailexemplo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                        type="text" 
                        placeholder="******"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        />
                        <button>Enviar</button>
                    </form>
                </section>

                <div></div>
                
            </main>

    </div>
    )
}
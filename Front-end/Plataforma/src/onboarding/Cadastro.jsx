import { useState } from "react";
import ImagemCadastro from "../assets/imagemCadastro.svg";

export function Cadastro() {

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cargo, setCargo] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function proximo() {

    }

    function cadastrar() {
        
    }

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
                        <button onClick={proximo}>Próximo</button>
                    </form>
                </section>

                <section>
                    <form action="">
                        <select 
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        >
                        <option value="">Selecione o tipo de usuário</option>
                        <option value="dono">Dono</option>
                        <option value="secretaria">Secretária</option>
                        <option value="limpeza">Equipe de Limpeza</option>
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
                        <button onClick={cadastrar}>Enviar</button>
                    </form>
                </section>

                <div id="Resultado"></div>
                
            </main>

    </div>
    )
}
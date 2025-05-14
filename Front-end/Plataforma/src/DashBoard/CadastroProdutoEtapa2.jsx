import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CadastroProdutosEtapa2({ formData, setFormData }) {
    const navigate = useNavigate();

    // AQUI ENVIA PARA O BANCO DE DADOS
    const enviar = (e) => {
        e.preventDefault();
        // enviar para o banco de dados 
        console.log(formData);
        navigate('/produtos');
    }

    return (
        <>
            <div>
                <div>
                    <h1 >Cadastro de produtos</h1>
                    <div>
                        <form onSubmit={enviar} style={{ justifyContent: "center", alignContent: "center", alignItems: "center"}}>
                            <div className="container">
                            <label htmlFor="limiteDeUso">Limite de uso</label>
                            <input
                                type="text"
                                id="limiteDeUso"
                                placeholder="Digite o limite de uso semanal:"
                                onChange={(e) => setFormData({ ...formData, limiteDeUso: e.target.value })} />
                            <br />
                            </div>

                            <div className="container">
                            <label htmlFor="dataValidade">Data de validade:</label>
                            <input
                                type="text"
                                id='dataValidade'
                                placeholder='Digite a data de validade (ex: 08/27)'
                                onChange={(e) => setFormData({ ...formData, dataValidade: e.target.value })} />
                            <br />
                            </div>


                            <div className="container">
                            <label htmlFor="dataEntrada">Data de entrada:</label>
                            <input
                                type="text"
                                id='dataEntrada'
                                placeholder='Digite a data de entrada (ex: 08/27)'
                                onChange={(e) => setFormData({ ...formData, dataEntrada: e.target.value })} />
                            <br />
                            </div>

                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
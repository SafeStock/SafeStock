import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CadastroProdutosEtapa1({ formData, setFormData }) {
    const navigate = useNavigate();

    const proximo = (e) => {
        e.preventDefault();
        navigate('/etapa2');
    };

    const inputClass =
    "w-[19.5vw] p-[1vh] rounded-[10px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none focus:border-[#2F4672] transition-colors duration-200";

    return (
        <div>
            <div>
               <h2>Cadastro de produtos</h2>
                <form onSubmit={proximo}>  
                    <div>
                        <label htmlFor="nome">
                            Nome:
                        </label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Digite o nome do produto"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="categoria">
                            Categoria:
                        </label>
                        <input
                            type="text"
                            id="categoria"
                            placeholder="Digite a categoria do produto"
                            value={formData.categoria}
                            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="quantidade">
                            Quantidade:
                        </label>
                        <input
                            type="text"
                            id="quantidade"
                            placeholder="Digite a quantidade de produtos"
                            value={formData.quantidade}
                            onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit">
                        Próximo
                    </button>
                </form>
            </div>
        </div>
    );
}
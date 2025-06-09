import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getToken } from '../Moleculas/getToken';
import {
    AlertaInformationDiv,
    AlertExibition,
    StatusAlertExibition
} from '../Atomos/DivElementKPIDono';

export function MiniHistoricoAlerta({ endpoint }) {
    const [alertaPrincipal, setAlertaPrincipal] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const token = getToken();
    dayjs.extend(customParseFormat);


    useEffect(() => {
        if (!endpoint) {
            setErro('Endpoint não fornecido');
            setCarregando(false);
            return;
        }

        if (!token) {
            setErro('Token de autenticação não encontrado');
            setCarregando(false);
            return;
        }

        const buscarAlertaCritico = async () => {
            try {
                setCarregando(true);
                const response = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Extrai alertas independentemente da estrutura
                let dadosAlertas = response.data?.data || response.data?.alertas || response.data;

                // Garante que é um array
                if (!Array.isArray(dadosAlertas)) {
                    dadosAlertas = [];
                }

                console.log("Dados recebidos:", dadosAlertas);

                // Filtra alertas válidos (com status e dataValidade)
                const alertasValidos = dadosAlertas.filter(a =>
                    a &&
                    a.produto &&
                    a.produto.dataValidade
                );

                console.log("Alertas válidos:", alertasValidos);

                // Ordena por prioridade e data mais próxima
                const alertasOrdenados = [...alertasValidos].sort((a, b) => {
                    // Prioridade: críticos primeiro
                    if (a.status === 'critico' && b.status !== 'critico') return -1;
                    if (a.status !== 'critico' && b.status === 'critico') return 1;

                    // Se o status for igual ou ambos não forem críticos, ordena pela data
                    const dataA = new Date(a.produto.dataValidade);
                    const dataB = new Date(b.produto.dataValidade);
                    return dataA - dataB;
                });


                console.log("Alertas ordenados:", alertasOrdenados);

                const alerta = alertasOrdenados[0] || null;
                setAlertaPrincipal(alerta);
                console.log("Alerta principal selecionado:", alerta);
            } catch (error) {
                console.error('Erro ao buscar alertas:', error);
                setErro(error.message || 'Falha ao carregar alertas');
            } finally {
                setCarregando(false);
            }
        };

        buscarAlertaCritico();
    }, [endpoint, token]);

    if (carregando) return <div className="p-4 text-center">Carregando alertas...</div>;
    if (erro) return <div className="p-4 text-red-500 text-center">{erro}</div>;
    if (!alertaPrincipal) return <div className="p-4 text-center">Nenhum alerta crítico no momento</div>;
    console.log("Data de validade recebida:", alertaPrincipal.produto.dataValidade);


    // Extrai informações do produto do alerta principal
    const nomeProduto = alertaPrincipal.produto?.nome || 'Produto desconhecido';
    const validadeProduto = alertaPrincipal.produto?.dataValidade;
    if (!validadeProduto) {
        console.warn("Produto sem data de validade:", alertaPrincipal.produto);
        return <div className="p-4 text-center">Produto sem data de validade cadastrada</div>;
    }

    const dataValidade = dayjs(validadeProduto);
    const hoje = dayjs();
    const diasParaVencer = dataValidade.diff(hoje, 'day');

    console.log("Dias para vencer:", diasParaVencer);

    const mensagem = (
        <span className='text-[3vh] '>
            <strong className='text-[#73b1e8]'>{nomeProduto}</strong> está a <strong className='text-[#ff0303] '> {diasParaVencer} dias do vencimento</strong>!
        </span>
    );


    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-[#3A577B] w-full h-[5vh] flex justify-center items-center text-[23px] font-[600] mt-[5vh] ">
                <StatusAlertExibition
                    cor={alertaPrincipal.status === 'critico' ? '#ff0303' : '#FFA500'}
                    status='ATENÇÃO'
                />
            </div>


            <div className="flex flex-row justify-center items-center h-full w-full gap-4">
                <AlertaInformationDiv tamanho="100%">
                    <AlertExibition>{mensagem}</AlertExibition>
                </AlertaInformationDiv>
            </div>

        </div>
    );
};

MiniHistoricoAlerta.propTypes = {
    endpoint: PropTypes.string.isRequired
};
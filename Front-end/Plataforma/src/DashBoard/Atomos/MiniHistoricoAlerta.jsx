import React, { Component, useEffect, useState } from 'react';
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

dayjs.extend(customParseFormat);

// --- Função utilitária para transformar erros em string ---
function getErrorMessage(error) {
    if (!error) return "Erro desconhecido";
    if (typeof error === "string") return error;
    if (error.message && typeof error.message === "string") return error.message;
    if (error.response?.data?.message && typeof error.response.data.message === "string")
        return error.response.data.message;
    return JSON.stringify(error);
}

// --- Componente funcional principal ---
function MiniHistoricoAlerta({ endpoint }) {
    const [alertaPrincipal, setAlertaPrincipal] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const token = getToken();

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

                let dadosAlertas = response.data?.data || response.data?.alertas || response.data;
                if (!Array.isArray(dadosAlertas)) dadosAlertas = [];

                const alertasValidos = dadosAlertas.filter(a => a && a.produto && a.produto.dataValidade);

                // Prioritize critical alerts first (stable), otherwise rely on backend ordering by proximity
                const criticos = alertasValidos.filter(a => a.status === 'critico');
                if (criticos.length > 0) {
                    setAlertaPrincipal(criticos[0]);
                } else {
                    setAlertaPrincipal(alertasValidos[0] || null);
                }
            } catch (error) {
                console.error('Erro ao buscar alertas:', error);
                setErro(getErrorMessage(error));
            } finally {
                setCarregando(false);
            }
        };

        buscarAlertaCritico();
    }, [endpoint, token]);

    // --- Renderização segura ---
    if (carregando) return <div className="p-4 text-center">Carregando alertas...</div>;
    if (erro) return <div className="p-4 text-red-500 text-center">{getErrorMessage(erro)}</div>;
    if (!alertaPrincipal || !alertaPrincipal.produto) return <div className="p-4 text-center">Nenhum alerta crítico no momento</div>;

    const nomeProduto = alertaPrincipal.produto?.nome || 'Produto desconhecido';
    const validadeProduto = alertaPrincipal.produto?.dataValidade;
    if (!validadeProduto) return <div className="p-4 text-center">Produto sem data de validade cadastrada</div>;



    const mensagem = (
        <span className='text-[3vh] animate-pulsar'>
            <strong className='text-[#73b1e8]'>{nomeProduto}</strong> está  próximo ao<strong className='text-[#ff0303]'> vencimento!</strong>
        </span>
    );

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-[#3A577B] w-full h-[5vh] flex justify-center items-center text-[23px] font-[600] mt-[5vh] animate-pulsar">
                <StatusAlertExibition
                    cor={alertaPrincipal.status === 'critico' ? '#ff0303' : '#FFA500'}
                    status='ATENÇÃO'
                />
            </div>

            <div className="flex flex-row justify-center items-center h-full w-full gap-4 animate-pulsar">
                <AlertaInformationDiv tamanho="100%">
                    <AlertExibition>{mensagem}</AlertExibition>
                </AlertaInformationDiv>
            </div>
        </div>
    );
}

MiniHistoricoAlerta.propTypes = {
    endpoint: PropTypes.string.isRequired
};


class MiniHistoricoAlertaErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }; // guarda o erro
    }

    componentDidCatch(error, errorInfo) {
        console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 text-red-500 text-center">
                    Ocorreu um erro: {getErrorMessage(this.state.error)}
                </div>
            );
        }
        return this.props.children;
    }
}

// --- Wrapper que exporta o componente com ErrorBoundary ---
export function MiniHistoricoAlertaWrapper({ endpoint }) {
    return (
        <MiniHistoricoAlertaErrorBoundary>
            <MiniHistoricoAlerta endpoint={endpoint} />
        </MiniHistoricoAlertaErrorBoundary>
    );
}

export default MiniHistoricoAlerta;

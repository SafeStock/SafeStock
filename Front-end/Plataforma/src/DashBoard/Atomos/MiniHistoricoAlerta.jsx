import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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

    // Debug: Verifique a estrutura real da response
    console.log("Dados brutos da API:", response.data);

    // Extrai alertas independentemente da estrutura
    let dadosAlertas = response.data?.data || response.data?.alertas || response.data;
    
    // Garante que é um array
    if (!Array.isArray(dadosAlertas)) {
      dadosAlertas = [];
    }

    // Filtra alertas válidos (com status)
    const alertasValidos = dadosAlertas.filter(a => a && a.status);
    
    // Ordena: críticos primeiro
    const alertasOrdenados = [...alertasValidos].sort((a, b) => 
      a.status === 'critico' ? -1 : b.status === 'critico' ? 1 : 0
    );

    const alerta = alertasOrdenados[0] || null;
    setAlertaPrincipal(alerta);
    console.log("Alerta selecionado:", alerta); // Agora mostra o valor atualizado
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

    return (
        <div className="w-full h-[50vh] flex flex-col">
            <div className="text-[#3A577B] w-full h-[5vh] flex justify-center items-end text-[23px] font-[600] mb-2">
                Histórico de Alertas
            </div>

            <div className="w-full h-[calc(100%-5vh)] flex justify-center items-center px-4">
                <div className="flex flex-row justify-center items-center h-full w-full gap-4">
                    {/* Card do Alerta */}
                    <AlertaInformationDiv tamanho="50%">
                        <div className="text-[#547A81] font-[600] text-[21.5px] w-full h-[30%] flex justify-center items-center mb-2">
                            {alertaPrincipal.titulo || 'Alerta Crítico'}
                        </div>
                        <div className="w-full h-[70%] flex justify-center">
                            <AlertExibition alert={alertaPrincipal.mensagem} />
                        </div>
                    </AlertaInformationDiv>

                    {/* Card do Status */}
                    <AlertaInformationDiv tamanho="50%">
                        <div className="text-[#547A81] font-[600]  text-[21.5px] w-full h-[30%] flex justify-center items-center mb-2">
                            Status
                        </div>
                        <div className="w-full h-[70%] flex justify-center">
                            <StatusAlertExibition
                                cor={alertaPrincipal.status === 'critico' ? '#E10000' : '#FFA500'}
                                status={alertaPrincipal.status === 'critico' ? 'Crítico' : 'Atenção'}
                            />
                        </div>
                    </AlertaInformationDiv>
                </div>
            </div>
        </div>
    );
};

MiniHistoricoAlerta.propTypes = {
    endpoint: PropTypes.string.isRequired
};
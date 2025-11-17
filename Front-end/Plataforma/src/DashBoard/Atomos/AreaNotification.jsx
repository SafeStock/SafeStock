import { useEffect, useState } from "react";
import { NotificationBalloon } from "./NotificationBalloon";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../config/api';


export function AreaNotification( { tabela, campos  } ) {
     const [dados, setDados] = useState([]);
      const token = sessionStorage.getItem('authToken');
    
    
      const formatarTelefone = (telefone) => {
        if (!telefone) return "";
        return telefone.replace(/\D/g, ""); 
      };
    
    
      function formatarDataOuDataHora(dataString) {
        if (!dataString) return "-";
        const data = dayjs(dataString);
        if (!data.isValid()) return dataString;
        const ehMeiaNoite = data.hour() === 0 && data.minute() === 0;
        return ehMeiaNoite
          ? data.format("DD-MM-YYYY")
          : data.format("DD-MM-YYYY HH:mm");
      }
    
      const formatarCargo = (cargo) => {
        if (!cargo) return "";
        switch (cargo.toLowerCase()) {
          case "dono":
            return "Dono";
          case "administracao":
          case "adm":
            return "Adm";
          case "limpeza":
            return "Limpeza";
          default:
            return cargo;
        }
      };
    
    
      const formatarCategoria = (categoriaProduto) => {
        if (!categoriaProduto) return "";
        switch (categoriaProduto.toLowerCase()) {
          case "vidros":
            return "Vidro";
          case "chao":
            return "Chão";
          case "muilti_uso":
            return "Multi Uso";
          default:
            return categoriaProduto;
        }
      };
    
      const formatarStatus = (categoriaStatus) => {
        if (!categoriaStatus) return "";
        switch (categoriaStatus.toLowerCase()) {
          case "critico":
            return "Crítico";
          case "atenção":
            return "Atenção";
          default:
            return categoriaStatus;
        }
      };
      const buscarDados = () => {
        if (!token || token.trim() === "") {
          console.warn("Token inválido ou não informado");
          return;
        }
    
        axios.get(`${API_BASE_URL}/api/${tabela}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            
            const dadosBrutos = response.data;
            console.log("Dados brutos recebidos:", dadosBrutos);
            
            const lista = Array.isArray(dadosBrutos)
              ? dadosBrutos
              : Array.isArray(dadosBrutos[tabela])
                ? dadosBrutos[tabela]
                : [];
    
            const dadosFormatados = lista.map(item => ({
              ...item,
              telefone: formatarTelefone(item.telefone),
              cargo: formatarCargo(item.cargo),
              status: formatarStatus(item.status),
              categoriaProduto: formatarCategoria(item.categoriaProduto),
              dataHora: formatarDataOuDataHora(item.dataHora),
              dataHoraSaida: formatarDataOuDataHora(item.dataHoraSaida),
              dataValidade: formatarDataOuDataHora(item.dataValidade),
              dataEntrada: formatarDataOuDataHora(item.dataEntrada)
            }));
    
            setDados(dadosFormatados);
            // console.log("Dados formatados:", dadosFormatados);
    
            // 2. Processar alertas SEPARADAMENTE
            // Extrai alertas independentemente da estrutura
            let dadosAlertas = response.data?.data || response.data?.alertas || response.data;
    
            // Garante que é um array
            if (!Array.isArray(dadosAlertas)) {
              dadosAlertas = [];
            }
    
            // console.log("Dados recebidos:", dadosAlertas);
    
            // Filtra alertas válidos (com status e dataValidade)
            const alertasValidos = dadosAlertas.filter(a =>
              a &&
              a.status &&
              a.produto &&
              a.produto.dataValidade
            );
    
            // console.log("Alertas válidos:", alertasValidos);
    
        
            const alertasOrdenados = [...alertasValidos].sort((a, b) => {
        
              const prioridadeA = a.status === 'critico' ? 0 : 1;
              const prioridadeB = b.status === 'critico' ? 0 : 1;
    
              if (prioridadeA !== prioridadeB) {
                return prioridadeA - prioridadeB;
              }
    
        
              const dataA = new Date(a.produto.dataValidade);
              const dataB = new Date(b.produto.dataValidade);
              return dataA - dataB;
            });
    
            // console.log("Alertas ordenados:", alertasOrdenados);
    
            const alerta = alertasOrdenados[0] || null;
            console.log("Alerta principal selecionado:", alerta);
          })
          .catch((error) => { 
            console.error(`Erro ao buscar ${tabela}:`, error);
          });
      }; 
      
      useEffect(() => {
        buscarDados();
        // eslint-disable-next-line
      }, [tabela]);

      return (
        <div className=" overflow-hidden bg-[white] w-full
              h-[86vh] flex flex-col items-start justify-start">
          <NotificationBalloon
            campos={campos}
            dados={dados}
          />
        </div>
      );
    }
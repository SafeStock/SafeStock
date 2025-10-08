// import { useEffect, useState } from "react";
// import 'dayjs/locale/pt-br';
// import axios from 'axios';
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';

export function Notification() {

//   const [dados, setDados] = useState([]);
//   const token = sessionStorage.getItem('authToken');

//    const buscarDados = () => {
//     if (!token || token.trim() === "") {
//       console.warn("Token inválido ou não informado");
//       return;
//     }

//     axios.get(`http://localhost:8080/api/${tabela}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((response) => {
        
//         const dadosBrutos = response.data;
//         console.log("Dados brutos recebidos:", dadosBrutos);
        
//         const lista = Array.isArray(dadosBrutos)
//           ? dadosBrutos
//           : Array.isArray(dadosBrutos[tabela])
//             ? dadosBrutos[tabela]
//             : [];

//         const dadosFormatados = lista.map(item => ({
//           ...item,
//           telefone: formatarTelefone(item.telefone),
//           cargo: formatarCargo(item.cargo),
//           status: formatarStatus(item.status),
//           categoriaProduto: formatarCategoria(item.categoriaProduto),
//           dataHora: formatarDataOuDataHora(item.dataHora),
//           dataHoraSaida: formatarDataOuDataHora(item.dataHoraSaida),
//           dataValidade: formatarDataOuDataHora(item.dataValidade),
//           dataEntrada: formatarDataOuDataHora(item.dataEntrada)
//         }));

//         setDados(dadosFormatados);
//         // console.log("Dados formatados:", dadosFormatados);

//         // 2. Processar alertas SEPARADAMENTE
//         // Extrai alertas independentemente da estrutura
//         let dadosAlertas = response.data?.data || response.data?.alertas || response.data;

//         // Garante que é um array
//         if (!Array.isArray(dadosAlertas)) {
//           dadosAlertas = [];
//         }

//         // console.log("Dados recebidos:", dadosAlertas);

//         // Filtra alertas válidos (com status e dataValidade)
//         const alertasValidos = dadosAlertas.filter(a =>
//           a &&
//           a.status &&
//           a.produto &&
//           a.produto.dataValidade
//         );

//         // console.log("Alertas válidos:", alertasValidos);

    
//         const alertasOrdenados = [...alertasValidos].sort((a, b) => {
    
//           const prioridadeA = a.status === 'critico' ? 0 : 1;
//           const prioridadeB = b.status === 'critico' ? 0 : 1;

//           if (prioridadeA !== prioridadeB) {
//             return prioridadeA - prioridadeB;
//           }

    
//           const dataA = new Date(a.produto.dataValidade);
//           const dataB = new Date(b.produto.dataValidade);
//           return dataA - dataB;
//         });

//         // console.log("Alertas ordenados:", alertasOrdenados);

//         const alerta = alertasOrdenados[0] || null;
//         console.log("Alerta principal selecionado:", alerta);
//       })
//       .catch((error) => { 
//         console.error(`Erro ao buscar ${tabela}:`, error);
//       });
//   };  useEffect(() => {
//     buscarDados();
//     // eslint-disable-next-line
//   }, [tabela]);
 

    return (
    <>
    <div className="w-[100%] h-[2vh] min-h-[1.3vh]"></div>
    <div className="w-[95%] min-h-[12vh] rounded-[1vw] shadow-[5px_3px_10px_rgba(0,0,0,0.15)] ">
      <UserInformationTable
            //   dados={dados} 
            //   tabela={tabela}
            />
    </div>
    </>
  );
}

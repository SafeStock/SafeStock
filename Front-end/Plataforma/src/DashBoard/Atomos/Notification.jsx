// import { useEffect, useState } from "react";
// import axios from "axios";
// import { UserInformationTable } from "../Celulas/UserInformationTable.jsx";

// export function Notification() {
//   const [dados, setDados] = useState([]);
//   const token = sessionStorage.getItem("authToken");

//   useEffect(() => {
//     if (!token) {
//       console.warn("Token não encontrado. Faça login novamente.");
//       return;
//     }

//     axios
//       .get("http://localhost:8080/api/produtos/listar", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log("📦 Dados recebidos da API:", res.data);

//         // Garante que o retorno é um array
//         const lista = Array.isArray(res.data)
//           ? res.data
//           : Array.isArray(res.data.content)
//           ? res.data.content
//           : [];

//         setDados(lista);
//       })
//       .catch((err) => {
//         console.error("❌ Erro ao buscar dados:", err);
//       });
//   }, [token]);

//   // Define as colunas da tabela (pode ajustar conforme seu objeto)
//   const titles = ["ID", "Nome", "Categoria", "Quantidade", "Status"];
//   const campos = ["id", "nome", "categoriaProduto", "quantidade", "status"];

//   return (
//     <>
//       <div className="w-[100%] h-[2vh] min-h-[1.3vh]" />
//       <div className="w-[95%] min-h-[12vh] rounded-[1vw] shadow-[5px_3px_10px_rgba(0,0,0,0.15)]">
//         <UserInformationTable
//           dados={dados}
//           titles={titles}
//           campos={campos}
//           tabela="produtos"
//           mostrarIcone={true}
//           mostrarIconesAlteracao={false}
//         />
//       </div>
//     </>
//   );
// }

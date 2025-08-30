import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Lembrar de sempre colocar o "use", quando for criar um hook
export function useSetAba() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/login":
        document.title = "Login | SafeStock";
        break;

      case "/dashboard/cadastro":
        document.title = "Cadastro | SafeStock";
        break;

      case "/dashboard/telafuncionarios":
        document.title = "Funcionários | SafeStock";
        break;

      case "/dashboard":
        document.title = "DashBoard | SafeStock";
        break;

      case "/dashboard/historicoalertas":
        document.title = "Historico | SafeStock";
        break;

      case "/dashboard/historicouso":
        document.title = "Historico | SafeStock";
        break;

      case "/dashboard/dashboardlimpeza":
        document.title = "DashBord | SafeStock";
        break;

      case "/dashboard/telaprodutos":
        document.title = "Produtos | SafeStock";
        break;  

      case "/dashboard/exportarrelatorio":
        document.title = "Exportar Relatório | SafeStock";
        break;
        
    }
  }, [location.pathname]);
}

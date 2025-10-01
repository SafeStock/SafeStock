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

      case "/cadastro":
        document.title = "Cadastro | SafeStock";
        break;

      case "/CadastroProduto":
        document.title = "Cadastro de Produtos | SafeStock";
        break;

      case "/telafuncionarios":
        document.title = "Funcionários | SafeStock";
        break;

      case "/dashboard":
        document.title = "DashBoard | SafeStock";
        break;

      case "/dashboardlimpeza":
        document.title = "DashBoard | SafeStock";
        break;


      case "/historicoalertas":
        document.title = "Histórico | SafeStock";
        break;

      case "/historicouso":
        document.title = "Histórico | SafeStock";
        break;

      case "/telaprodutos":
        document.title = "Produtos | SafeStock";
        break;  

      case "/exportarrelatorio":
        document.title = "Exportar Relatório | SafeStock";
        break;
        
    }
  }, [location.pathname]);
}

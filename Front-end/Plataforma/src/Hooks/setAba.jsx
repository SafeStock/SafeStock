import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Lembrar de sempre colocar o "use", quando for criar um hook
export function useSetAba() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Login | SafeStock";
        break;

      case "/cadastro":
        document.title = "Cadastro | SafeStock";
        break;

      case "/dashBoard/TelaFuncionarios":
        document.title = "Funcionários | SafeStock";
        break;

    }
  }, [location.pathname]);
}

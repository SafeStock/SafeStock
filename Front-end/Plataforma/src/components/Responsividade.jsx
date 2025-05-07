import { useEffect } from "react";

function Responsividade() {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("data-account", "q7R6Hmn59Q");
    script.src = "https://cdn.userway.org/widget.js";
    document.body.appendChild(script);
  }, []);

  return null;
}

export default Responsividade;
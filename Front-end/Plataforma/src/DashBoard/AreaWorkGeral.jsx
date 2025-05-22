import AreaWork from "./AreaWork";

export default function AreaWorkGeral() {
  // Exemplo: você pode controlar a tabela com um estado ou props
  const tabelaSelecionada = "funcionarios"; // ou "produtos", "alertas", etc.

  return (
    <div>
      <AreaWork tabela={tabelaSelecionada} />
    </div>
  );
}
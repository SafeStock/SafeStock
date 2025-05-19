import { AreaSubTitleProdutos } from "../Moleculas/AreaSubTitleProdutos";
import { ProdutosInformation } from "../Moleculas/ProdutosInformation";

export function AreaWorkProdutos({ displayParaProdutos = "none", abrirModal }) {
  return (
    <div className="flex items-center flex-col" style={{ display: displayParaProdutos }}>
      <AreaSubTitleProdutos
        title1="Nome"
        title2="Categoria"
        title3="Quantidade"
        title4="Limite"
        title5="Data de validade"
        title6="Data de entrada"
      />
      <ProdutosInformation abrirModal={abrirModal} />
    </div>
  );
}

import alunos from "../assets/alunos.png"
import { Button } from "../components/Button"

export function Home() {
    return (
        <section id="Home" className="flex justify-center items-center  bg-[#fff] w-full h-[91vh] text-[#5390e7] pt-[5.5%] overflow-x-hidden">

            <div className=" flex flex-col justify-center gap-[1.5vh] h-full max-w-[45%] px-4">
                <div className="flex ">

                </div>
                <h1 className="text-[8.5vh] ">
                    <span className="text-[#3A577B]">Bem-Vindo ao <br /> Safe</span><strong>Stock</strong>
                </h1>
                <p className="text-[#3A577B] text-[3.5vh] mt-4">
                    Sistema inteligente para <span className="">gestão eficiente do estoque</span> seguro de produtos de limpeza.
                </p>
                <Button />
            </div>

            <div className="flex justify-center items-center h-full">
                <img src={alunos} alt="alunos" className="max-h-[100%] left-[10%] relative  " />
            </div>

        </section>
    )
}

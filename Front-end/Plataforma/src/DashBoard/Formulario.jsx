import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Formulario({ titulo, campos, onSubmit, navigateTo = "/dashboard", buttonLabel = "Enviar" }) {
    const navigate = useNavigate();
    const [form, setForm] = useState(
        Object.fromEntries(campos.map(campo => [campo.name, ""]))
    );
    const [mensagemErro, setMensagemErro] = useState("");
    const [color, setColor] = useState("");

    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const enviar = async (e) => {
  e.preventDefault();

const camposVazios = Object.entries(form).filter(([, value]) => value.trim() === "");


  if (camposVazios.length > 0) {
    setMensagemErro("Preencha todos os campos obrigatórios!");
    setColor("red");
    return; 
  }

  // Se passou na validação, continua normal
  if (onSubmit) {
    const result = await onSubmit(form);
    if (navigateTo && result !== false) {
      navigate(navigateTo);
    }
  }
};


    const inputClass = "w-[20vw] p-[1.5vh] rounded-[8px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] focus:outline-none mb-[2vh]";
    const labelClass = "block text-sm font-medium text-gray-600 text-[#2F4672] mb-[0.5rem]";
    const bottomClass = "cursor-pointer text-[#fff] font-extrabold text-[2vh] bg-[#2F4672] p-[0.8vh] rounded-[30px] border border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[white] hover:text-[#2F4772] hover:border-[1px] hover:border-[#2F4772] transition duration-200 mb-[3vh] mt-[1vh] w-[40%] h-[4.5vh] mx-auto";
    const mainContaner = "flex items-center justify-center h-screen bg-gray-100";
    const container = "p-[50vh] bg-white rounded-[30px] shadow-lg  shadow-[3px_3px_8px_rgba(0,0,0,0.3)]";
    const titleClass = "text-2xl font-bold text-center text-[#2F4672] mb-[1.5rem]";
    const formClass = "flex flex-col gap-6";

    return (
        <div className={mainContaner}>
            <div className={container}>
                <h2 className={titleClass}>{titulo}</h2>
                <form onSubmit={enviar} className={formClass}>
                    {campos.map((campo, idx) => (
                        <div key={campo.name || idx}>
                            <label htmlFor={campo.name} className={labelClass}>
                                {campo.label}
                            </label>
                            <input
                                type={campo.type || "text"}
                                id={campo.name}
                                name={campo.name}
                                className={inputClass}
                                placeholder={campo.placeholder}
                                value={form[campo.name] ?? ""}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit" className={bottomClass}>{buttonLabel}</button>
                </form>
                {/* Mensagem de erro */}
                <div className="w-[40vh] mt-2 text-center text-[2vh]">

                    {console.log(color)}

                    <span
                        className={`${mensagemErro ? "opacity-100" : "opacity-0"
                            } transition-opacity duration-300`}
                        style={{ color: mensagemErro ? color : "transparent" }}
                    >
                        {mensagemErro || "mensagem de erro"}
                    </span>
                </div>

            </div>
        </div>
    );
}
import { useState } from "react";
import logo from "../assets/logoNome.png";

export function NavBar() {
    const [active, setActive] = useState("Home");

    const navItems = ["Home", "Por que SafeStock", "Serviços", "Contate-nos"];

    const funcaoScroll = (item) => {
        setActive(item);
        const section = document.getElementById(item);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="flex items-center justify-center gap-[25vh] w-full h-[13vh] bg-[#f3f3f3] text-[#3d3a3a] rounded-b-[30px] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] fixed top-0 z-50">
            <div>
                <img src={logo} className="w-[40%]" alt="logo safeStock" />
            </div>

            <div>
                <ul className="flex gap-[5vh] text-[20px]">
                    {navItems.map((item) => (
                        <li
                            key={item}
                            onClick={() => funcaoScroll(item)}
                            className={`cursor-pointer transition-all duration-300 ease-in-out ${active === item
                                    ? "!font-[550] text-[#74B1E7]"
                                    : "font-normal"
                                }`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

import { SquareChevronUp } from "lucide-react";
import { useEffect, useState } from 'react';

export default function BtnSubir() {

  
    const [visibilidade, setVisibilidade] = useState(false);

  
    useEffect(() => {
        const checarVisibilidade = () => {
            setVisibilidade(window.scrollY > 2500);
        };

  
        window.addEventListener('scroll', checarVisibilidade);
        return () => window.removeEventListener('scroll', checarVisibilidade);
    }, []);


    
    const subirTela = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    
    return (
        <>
            {visibilidade && (
                <span
                    onClick={subirTela}
                    role="button"
                    
                    className="fixed bottom-[19.2%] right-[2.5%]  text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 z-50 cursor-pointer"
                ><SquareChevronUp className="w-[6vh] h-[6vh] hover:scale-110 transform " color="#5390e7" />
                </span>
            )}
        </>
    );
}

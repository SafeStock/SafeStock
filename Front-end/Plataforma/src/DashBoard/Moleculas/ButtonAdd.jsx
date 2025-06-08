import { useNavigate } from "react-router-dom";
import { useSetAba } from "../../Hooks/setAba";

export function ButtonAdd({ displayButton ="none" }) {

        const navigate = useNavigate();

        const useAba = useSetAba();

        const handleRedirect = (path) => {
        navigate(path);
        useAba;
        };

  return (
      <div className="w-[8vw] h-[8vh] items-center justify-center mt-[2vh] ml-[3vw]" style={{ display: displayButton }}>
        <button
          onClick={() => handleRedirect('/dashboard/cadastro')}
          className="border-0 bg-[#3A577B] text-[26px] text-[#eee] font-[600] rounded-[50%]
        w-[6vh] h-[6vh] cursor-pointer hover:bg-[white] hover:text-[#2F4772] 
        hover:border-[1px] hover:border-[#2F4772] transition-colors duration-200 "
        >
          +
        </button>
      </div>
  );
}
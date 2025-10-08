import { AreaNotification } from "./AreaNotification"

export function ModalNotification() {
  return (

    <div className="absolute w-[100vw] h-[100vh] z-900 bg-[rgba(0,0,0,0.5)]" >
      <div className="h-[100vh] w-[30vw] bg-[white] float-right rounded-l-[1vw] shadow-[0px_4px_4px_rgba(0,0,0,0.75)] overflow-hidden">
        <div className="bg-[#3A577B] w-[100%] h-[10vh] flex justify-center items-center
        text-[white] text-[3.5vh] font-[500] border-b
        hover:bg-[white] transition-colors duration-300 hover:text-[#3A577B]">
          <p>Notificações</p>
        </div>
        <AreaNotification />
      <div className="bg-[#3A577B] w-[100%] h-[10vh] flex justify-center items-center text-[white] border-t
       hover:bg-[white] transition-colors duration-300 hover:text-[#3A577B]">
        <p className=" text-[2vh] font-[300]">Ver todas as notificações</p>
      </div>
    </div>
    </div>
  )
} 
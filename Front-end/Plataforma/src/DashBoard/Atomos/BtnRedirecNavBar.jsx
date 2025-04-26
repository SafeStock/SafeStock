export function BtnRedirecNavBar({imagemUrl}) {

  return (
    <button className="flex justify-center items-center w-[3vw] h-[6vh] bg-transparent border-none">
        <img src={imagemUrl} className="w-[2vw] h-[4vh]"/>
    </button>
  )
}
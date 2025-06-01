export function BtnRedirecNavBar({imagemUrl, onClick, title}) {

  return (
    <button onClick={onClick} className="bg-[#3A577B] hover:bg-[#8EB4E3] cursor-pointer transition-colors duration-200 flex justify-center items-center rounded-[1vh] w-[3vw] h-[6vh] border-none z-10">
        <img src={imagemUrl} className="w-[2vw] h-[4vh]" alt={title} title={title}/>
    </button>
  )
}
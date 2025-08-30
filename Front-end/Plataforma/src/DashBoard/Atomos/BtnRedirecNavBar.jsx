export function BtnRedirecNavBar({imagemUrl, onClick, title, display = "flex", ativado = false}) {

  return (
    <button onClick={onClick} className={`cursor-pointer 
    transition-colors duration-200 flex justify-center items-center rounded-[1vh] w-[3.5vw] h-[7vh] border-none z-10 
    ${ativado ? 'bg-[#577FB0]' : 'hover:bg-[#577FB0] bg-[#3A577B]'}`} style={{ display: display }}>
        <img src={imagemUrl} className="w-[2.3vw] h-[4.6vh]" alt={title} title={title}/>
    </button>
  )
}
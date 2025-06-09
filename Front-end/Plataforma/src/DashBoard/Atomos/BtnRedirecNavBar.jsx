export function BtnRedirecNavBar({imagemUrl, onClick, title, display = "flex"}) {

  return (
    <button onClick={onClick} className="bg-[#3A577B] hover:bg-[#8EB4E3] cursor-pointer 
    transition-colors duration-200 flex justify-center items-center rounded-[1vh] w-[3vw] h-[6vh] border-none z-10" style={{ display: display }}>
        <img src={imagemUrl} className="w-[2.2vw] h-[4.4vh]" alt={title} title={title}/>
    </button>
  )
}
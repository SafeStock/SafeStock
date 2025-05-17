// Modal.jsx
export function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[1000]"
    >
      <div
        className="w-[40vw] h-[80vh] bg-[white] rounded-[2vw] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Impede fechar clicando dentro
      >

        <div className="flex items-center justify-end w-full h-[7vh]">
        <button
          className="text-[30px] font-[inter] text-[#BDBDBD] border-none bg-transparent cursor-pointer mr-[1.5vw]"
          onClick={onClose}
        >
          x
        </button>
        </div>



      </div>
    </div>
  );
}

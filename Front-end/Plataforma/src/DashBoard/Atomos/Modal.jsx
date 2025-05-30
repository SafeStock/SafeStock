// Modal.jsx
export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[1000]"
    >
      <div
        className="w-[28vw] h-[60vh] bg-[white] rounded-[2vw] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // Impede fechar clicando dentro
      >
        {children}

        <button
          className="absolute bottom text-[30px] font-[inter]  border-none bg-transparent cursor-pointer"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>




      </div>
    </div>
  );
}

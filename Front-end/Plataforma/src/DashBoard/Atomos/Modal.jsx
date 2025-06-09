export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="w-[100vw] h-[100vh] fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-[1000]"
    >
      <div
        className="bg-[white] rounded-[1vw] flex flex-col overflow-hidden relative w-[30vw] h-[60vh]"
        onClick={e => e.stopPropagation()}
      >
        {children}

        <button
          className="absolute text-[30px] font-[inter] border-none bg-transparent cursor-pointer top-[12px] right-[18px]"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>
      </div>
    </div>
  );
}
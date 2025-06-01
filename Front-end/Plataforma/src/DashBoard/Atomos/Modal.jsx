// Modal.jsx
export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="w-full h-full flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-[1000]"
      // Removido o onClick do overlay para não fechar ao clicar fora
    >
      <div
        className="w-[25vw] h-[60vh] bg-[white] rounded-[1vw] flex flex-col overflow-hidden relative"
        // Mantém o stopPropagation apenas por segurança, mas não é mais necessário
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
export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="w-[100vw] animate-showing h-[100vh] fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] !important"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
      overflow: 'hidden', 
      zIndex: 1001,
      }}
    >
      <div
        className="animate-fadeInContent bg-[white] rounded-[1vw] flex flex-col overflow-hidden relative max-w-[50vw] max-h-[80vh]"
        onClick={e => e.stopPropagation()}
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}
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
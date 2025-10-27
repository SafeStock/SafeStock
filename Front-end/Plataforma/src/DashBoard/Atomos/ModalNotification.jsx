import { AreaNotification } from "./AreaNotification";

export function ModalNotification({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[900] bg-[rgba(0,0,0,0.4)] h-[99.9vh] w-[100vw] flex justify-end overflow-y-hidden"
      onClick={onClose}
    >
      <div
        className="h-[100vh] w-[30vw] bg-white rounded-l-[1vw] shadow-[0px_4px_4px_rgba(0,0,0,0.75)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#3A577B] w-full h-[7vh] flex justify-center items-center text-white text-[3.5vh] font-medium border-b">
          <div className="cursor-pointer absolute text-[white] text-[3vh] right-[28vw]"
          onClick={onClose}>x</div>
        </div>

        <AreaNotification />

        <div
          className="bg-[#3A577B] w-full h-[7vh] flex justify-center items-center text-white border-t hover:bg-white hover:text-[#3A577B] transition-colors duration-300 cursor-pointer"
        >
        </div>
      </div>
    </div>
  );
}

import ringIcon from '../../assets/Ring.svg';

export function BtnNotification({ onClick }) {
  return (
    <div
      className="relative w-[4.5vw] h-[9vh] ml-auto mr-[2vw] cursor-pointer flex items-center justify-center"
      onClick={onClick}
    >
      <img
        src={ringIcon}
        className="absolute left-0 w-[2.1vw] h-[4.2vh]"
      />
    </div>
  );
}

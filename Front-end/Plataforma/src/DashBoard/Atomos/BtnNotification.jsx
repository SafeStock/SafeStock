import { useState } from "react";

export function BtnNotification() {
  const [NewMessage, setNewMessage] = useState(false);

  return (
    <div className="relative w-[4.5vw] h-[9vh] ml-auto mr-[2vw] cursor-pointer flex items-center justify-center">
      {NewMessage && (
        <img
          src="/src/assets/Alert.gif"
          className="absolute left-0 w-[4.5vw] h-[9vh]"
          onClick={() => setNewMessage(false)}
        />
      )}

      {!NewMessage && (
        <img
          src="/src/assets/Ring.svg"
          className="absolute left-0 w-[2.1vw] h-[4.2vh]"
        />
      )}


    </div>
  );
}

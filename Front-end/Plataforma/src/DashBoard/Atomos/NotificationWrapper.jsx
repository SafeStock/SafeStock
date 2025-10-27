import { useState } from "react";
import { BtnNotification } from "./BtnNotification";
import { ModalNotification } from "./ModalNotification";

export function NotificationWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BtnNotification onClick={() => setIsOpen(true)} />
      <ModalNotification isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

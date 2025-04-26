import { AreaSubTitle } from "../Moleculas/AreaSubTitle";
import { UserInformation } from "../Moleculas/UsersInformation";

export function AreaWork() {
  return (
  <div className="mt-[3vh] flex flex-col items-center">
    <AreaSubTitle />
    <div className="mt-[3vh] h-[52vh] w-[75vw] flex flex-col items-center 
    overflow-y-auto scrollbar-thin rounded-[20px] 
    shadow-[0_0_5px_rgba(0,0,0,0.7)]">
      <UserInformation />
    </div>
    </div>
  );
}

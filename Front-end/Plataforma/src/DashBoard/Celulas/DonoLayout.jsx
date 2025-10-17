import { Outlet } from 'react-router-dom'
import { NavBarArea } from "./NavBarArea"

export function DonoLayout() {

  return (
    <div>
      <NavBarArea />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

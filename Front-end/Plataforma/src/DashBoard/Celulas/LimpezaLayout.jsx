import { Outlet, Link } from 'react-router-dom'
import { NavBarArea } from "./NavBarArea"

export function LimpezaLayout() {
  return (
    <div>
      <NavBarArea />
      <div className="">  
        <Outlet />
      </div>
    </div>
  )
}

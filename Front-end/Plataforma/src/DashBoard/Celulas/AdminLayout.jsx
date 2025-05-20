import { Outlet, Link } from 'react-router-dom'
import { NavBarArea } from "./NavBarArea"

export function AdminLayout() {
  return (
    <div>
      <NavBarArea />
      <div className="">
        <Outlet />
      </div>
    </div>
  )
}

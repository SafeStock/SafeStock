import { Outlet, Link } from 'react-router-dom'
import { NavBarArea } from "./NavBarArea"

export function DonoLayout() {
  return (
    <div className='animate-fadeInContent'>
      <NavBarArea />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

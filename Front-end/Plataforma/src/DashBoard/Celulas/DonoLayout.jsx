import { Outlet } from 'react-router-dom'
import { NavBarArea } from "./NavBarArea"
import { useEffect, useState } from "react";

export function DonoLayout() {


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className='animate-fadeInContent'>
      <NavBarArea />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

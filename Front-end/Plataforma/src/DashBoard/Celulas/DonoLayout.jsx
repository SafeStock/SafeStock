import { Outlet } from 'react-router-dom'
import { NavBarArea } from "./NavBarArea"
import { useEffect, useState } from "react";
import { AnimacaoDash } from '../Moleculas/AnimacaoLoading';

export function DonoLayout() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  
  if (loading) {
    return (
      < AnimacaoDash />
    );
  }

  return (
    <div className='animate-fadeInContent'>
      <NavBarArea />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

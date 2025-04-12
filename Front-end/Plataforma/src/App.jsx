import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './onboarding/Login.jsx'
import { Cadastro } from './onboarding/Cadastro.jsx'

function App() {

  return (
    <div>
      <Cadastro/>
    </div>
  )
}

export default App
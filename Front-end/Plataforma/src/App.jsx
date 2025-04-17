import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from "./onboarding/Login"
import { Cadastro } from './onboarding/Cadastro'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  )
}

export default App  
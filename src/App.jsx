import { useState } from 'react'
import Login from './components/signIn';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import ForgotMyPassword from './components/ForgotMyPassword';
import Home from './components/Home';
import { routess } from './utils/routess';



function App() {

  const rutas = routess();
 
  return (
    <>
      <BrowserRouter>     
            <Routes>
              {/* Rutas publicas */}
                <Route path="/" element={<Login/>} />
                <Route path={rutas.FORGOTPASSWORD} element={<ForgotMyPassword/>}/>
                {/* Rutas protegidas */}
                <Route path={rutas.HOME} element={<Home/>}/>
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

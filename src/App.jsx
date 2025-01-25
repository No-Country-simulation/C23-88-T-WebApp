import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { routess } from './utils/routes';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotMyPassword from './components/ForgotMyPassword';
import Home from './components/Home';
import Login from './components/signIn';
import Register from './components/SignUp';
import MoveHistory from './components/History';
import ResetPassword from './components/ResetPassword';

function App() {

  const rutas = routess();
 
  return (
    <>

      <BrowserRouter>     
            <Routes>
              {/* Rutas publicas */}
                <Route path={rutas.LOGIN} element={<Login/>} />
                <Route path={rutas.REGISTER} element={<Register/>}/>
                <Route path={rutas.FORGOTPASSWORD} element={<ForgotMyPassword/>}/>
                <Route path={rutas.RESETMYPASSWORD} element={<ResetPassword/>}/>
                          {/* Rutas protegidas */}
                <Route path={rutas.HOME} element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route path={rutas.LATESTMOVEMENTS} element={<ProtectedRoute><MoveHistory/></ProtectedRoute>}/>
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

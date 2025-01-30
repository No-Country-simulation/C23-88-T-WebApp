import React, { useEffect, useState } from "react";
import logo from "../../assets/logobanco.webp";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routess } from "../../utils/routes";

const ForgotMyPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const navigate =useNavigate();
  const routes = routess();

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email enviado", email);
    const emailExist = await checkEmailExists(email); 
    if (!emailExist) {
      toast.error("El email es inválido o no existe!");
    } else {
      toast.success("Email válido, se inició el proceso de recuperación");
      setRedirect(true);
    }      
    }

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        navigate(routes.RESETMYPASSWORD); 
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [redirect, navigate]);

    

  const checkEmailExists =async(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('El formato del correo electrónico no es válido');
    return false;
  }

    try {
      
      const response = await fetch('http://localhost:5101/api/Auth/reset-password',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        mode:'cors',
        body: JSON.stringify({ email }),
      });
      if(response.ok){
        const valideData = await response.json(); 
        console.log('correo existe',valideData)
        return true; 
      }else {
       console.warn('El correo no existe');
       return false; 
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      setErrorMessage(error.message); 
    }
  }

  const closed = () => {
    navigate(routes.LOGIN);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row h-screen w-screen">
        <div className="sm:w-1/2 p-8 flex flex-col justify-center">
          <ToastContainer/>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="flex flex-col items-center text-2xl font-bold text-gray-800 mt-4">
              Recuperar Contraseña
            </h2>
            <div className="flex flex-col w-full justify-center items-center">
              <label className="text-pretty text-lg block text-gray-700">
                Ingrese su correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="border rounded px-4 py-2 mt-2 w-full sm:w-72 h-12"
                placeholder="tuemail@example.com"
                required
              />
            </div>
            <div className="flex justify-center px-3 mx-3">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded justify-center items-center"
              >
                Enviar
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white py-2 px-4 rounded justify-center items-center mx-4"
                onClick={closed}
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
        {/* Columna Derecha: Imagen */}
        <div
          className="hidden sm:flex sm:w-1/2 bg-gray-900 flex-col justify-between"
          style={{
            backgroundImage: "url('https://via.placeholder.com/500')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <img src={logo} alt="Logo" className="w-32 mx-auto mt-4" />
          </div>
          <div>
            <p className="text-white text-center font-medium text-lg mt-auto mb-4">
              Banca Digital
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotMyPassword;

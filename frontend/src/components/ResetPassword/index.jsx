import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import logo from "../../assets/logobanco.webp";
import { useNavigate } from "react-router-dom";
import { routess } from "../../utils/routes";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




const ResetPassword =()=>{

  const [email, setEmail] = useState("");
  const [code,setCode] =useState("");
  const [newPassword,setNePassword]=useState("");
    const [errorMessage, setErrorMessage] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const API_URL = import.meta.env.VITE_API_URL;

	
	const navigate = useNavigate;
	const routes =routess();

  const handleInputEmail =(e)=>{
	e.preventDefault();
	setEmail(e.target.value);
	return console.log('tomando el dato')
	}


	const handleInputCode =(e)=>{
		e.preventDefault();
		setCode(e.target.value);
		console.log('tomando el codigo')
	}


	const handleInputNewPassword=(e)=>{
		e.preventDefault();
		setNePassword(e.target.value)
	}

	const handleInputConfirmPassword =(e)=>{
		e.preventDefault();
		setConfirmPassword(e.target.value);

	}
	const handleSubmit = async (e) => {
		e.preventDefault();
	

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error("El formato del correo electrónico no es válido");
			return;
		}
	

		if (!code || code.length === 0) {
			toast.error("El código de recuperación es obligatorio");
			return;
		}
	

		if (!newPassword || newPassword.length < 8) {
			toast.error("La nueva contraseña debe tener al menos 8 caracteres");
			return;
		}
		try {
			const response = await fetch(`${API_URL}/api/Auth/password-reset/complete`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, code, newpassword: newPassword }),
			});
	
			if (response.ok) {
				const result = await response.json();
				console.log("Resultado:", result);
				toast.success("Contraseña restablecida exitosamente");
				setNePassword('');
				setConfirmPassword('')
				setTimeout(() => {

					navigate(routes.LOGIN);
				}, 2000);

			} else {
				const errorData = await response.json();
				console.warn("Error:", errorData);
				toast.error(errorData.message || "Ocurrió un error al restablecer la contraseña");
			}
		} catch (error) {
			console.error("Error en la solicitud:", error.message);
			toast.error("No se pudo conectar al servidor");
		}
	};
	

	return(
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
				value={email}
                id="email"
				onChange={handleInputEmail}
                className="border rounded px-4 py-2 mt-2 w-full sm:w-72 h-12"
                placeholder="tuemail@example.com"
                required
              />
            </div>
			<div className="flex flex-col w-full justify-center items-center">
              <label className="text-pretty text-lg block text-gray-700">
                Ingrese el código
              </label>
              <input
                type="text"
                id="code"
                value={code}
				onChange={handleInputCode}
                className="border rounded px-4 py-2 mt-2 w-full sm:w-72 h-12"
                placeholder="123456"
                required
              />
            </div>
			<div className="flex flex-col w-full justify-center items-center">
              <label className="text-pretty text-lg block text-gray-700">
                Ingrese Nueva Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
				onChange={handleInputNewPassword}
                className="border rounded px-4 py-2 mt-2 w-full sm:w-72 h-12"
                placeholder="********"
                required
              />
            </div>
			<div className="flex flex-col w-full justify-center items-center">
              	<label className="text-pretty text-lg block text-gray-700">
                	Confirme Nueva Contraseña
            	</label>
              	<input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
				onChange={handleInputConfirmPassword}
                className="border rounded px-4 py-2 mt-2 w-full sm:w-72 h-12"
                placeholder="123456"
                required
            	/>
			  	<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute inset-y-0 right-0 w-16 text-gray-500 hover:text-gray-700 focus:outline-none"
					>
					{showPassword ?<FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/> } 
				</button>
            </div>
            <div className="flex justify-center px-3 mx-3">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded justify-center items-center"
              >
                Enviar
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
	)
}

export default ResetPassword;
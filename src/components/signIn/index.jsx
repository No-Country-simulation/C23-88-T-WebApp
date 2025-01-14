import { useState } from "react";
import logo from '../../assets/logobanco.webp';


const Login = () => {

	const [Credentias, setCredentials] = useState({
		email: '',
		password: ''
	});

	
	return (
		<div className="h-screen w-screen flex">
		  <div className="w-1/2 p-8 flex flex-col justify-center">
			<div className="flex flex-col items-center mb-6">
			  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
				<svg
				  className="w-6 h-6 text-blue-600"
				  xmlns="http://www.w3.org/2000/svg"
				  fill="none"
				  viewBox="0 0 24 24"
				  stroke="currentColor"
				>
				  <path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M5 13l4 4L19 7"
				  />
				</svg>
			  </div>
			  <h2 className="text-2xl font-bold text-gray-800 mt-4">
				Inicio de sesión
			  </h2>
			</div>
			<form className="space-y-4">
			  <div>
				<label
				  htmlFor="username"
				  className="block text-sm font-medium text-gray-700"
				>
				  Nombre de Usuario
				</label>
				<input
				  type="text"
				  id="username"
				  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				  placeholder="Ingresa tu usuario"
				/>
			  </div>
			  <div>
				<label
				  htmlFor="password"
				  className="block text-sm font-medium text-gray-700"
				>
				  Contraseña
				</label>
				<input
				  type="password"
				  id="password"
				  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				  placeholder="********"
				/>
			  </div>
			  <div className="flex items-center">
				<input
				  id="remember"
				  type="checkbox"
				  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
				/>
				<label htmlFor="remember" className="ml-2 text-sm text-gray-600">
				  Recuérdame
				</label>
			  </div>
			  <button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
			  >
				Inicio de Sesión
			  </button>
			</form>
		  </div>
		  {/* Columna Derecha: Imagen */}
		  <div
			className="w-1/2 bg-gray-900 flex flex-col justify-between"
			style={{
			  backgroundImage: "url('https://via.placeholder.com/500')",
			  backgroundSize: "cover",
			  backgroundPosition: "center",
			}}
		  >
			<div>
			  <img
				src={logo}
				alt="Logo"
				className="w-32 mx-auto mt-4"
			  />
			</div>
			<div>
			  <p className="text-white text-center font-medium text-lg mt-auto mb-4">
				Banca Digital
			  </p>
			</div>
		  </div>
	  </div>
		
	);
}
	export default Login;
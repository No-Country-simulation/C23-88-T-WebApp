import React, { useState } from "react";
import logo from "../../assets/logobanco.webp"

const ForgotMyPassword =()=>{

	const [email, setEmail]=useState("");


	//tomando los datos del campo de texto
	const handleEmailChange =(e)=>{
		e.preventDefault();
		setEmail(e.target.value);
	}


	//Enviando los datos al correo ingresado

	const handleSubmit =(e)=>{
		e.preventDefault();
		console.log("Email enviado", email)
	}

	return(
		<>
			<div className="flex flex-col sm:flex-row h-screen w-screen">
      			<div className="sm:w-1/2 p-8 flex flex-col justify-center">
      			  <form onSubmit={handleSubmit} className="space-y-4">
            		<h2 className="flex flex-col items-center text-2xl font-bold text-gray-800 mt-4">
            		  Recuperar Contraseña
            		</h2>
      			    	<div className="flex flex-col w-full justify-center items-center">
      			    	  <label className="text-pretty text-lg block text-gray-700">Ingrese su correo electrónico</label>
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

export default ForgotMyPassword;
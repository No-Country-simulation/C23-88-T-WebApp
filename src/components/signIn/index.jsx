import React, { useEffect, useState } from "react";
import logo from "../../assets/logobanco.webp";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { routess} from "../../utils/routess.jsx";

const api = "http://localhost:5101/";

const Login = () => {

	//estado para guardar los datos del formulario
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const routes = routess();
  //para llamar a la api del backend

/*   useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((json) => console.log(json));
  },[]);
 */

  //Toma los valores de los inputs
  const handleChange = (e) => {
	const {name, value}=e.target;
    setCredentials({
      ...credentials, //se mantiene el estado anterior
      [name]: value,
    });
  };


  const validateForm = () => {
	if (credentials.email.trim() === "") {
		toast.error("Ingresá los datos de tu usuario!");
			return false;
		}
		if (credentials.email.length < 8 || credentials.password.length < 8) {
			toast.error("El nombre de usuario y la contraseña deben tener al menos 8 caracteres.");
			return false;
		}
		return true;
	}


  //Envia los datos del formulario

  const handleSubmit = (e) => {
    console.log(credentials);

	e.preventDefault();
	if (validateForm()) {
    fetch('http://localhost:5101/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      //  'Authorization': `Bearer ${token}`, // Si aplica
      },
      mode: 'cors',
      body: JSON.stringify(credentials),
    })
    .then((response) => {
      if (!response.ok) {
          return response.json().then((errorData) => {
              throw new Error(errorData.errors?.password?.[0] || 'Error desconocido');
          });
      }
      return response.json();
  })
  .then((json) => {
      console.log('Datos enviados:', json);
  })
  .catch((error) => {
      console.error('Error en la solicitud:', error.message);
      setErrorMessage(error.message);  // Aquí actualizamos el estado de error
  });

  console.log("Formulario enviado", credentials); 
    
  }
}
  //guarda los datos en caché

  const saveCredentials = () => {
	localStorage
	.setItem('credentials', JSON.stringify(credentials));
  }
//retorna el formulario
/*   const getCredentials = () => {
	const credentials = localStorage.getItem('credentials');
	if(credentials){
		setCredentials(JSON.parse(credentials));
	}
	  } */
//llama a la función
/*   useEffect(() => {
	getCredentials();
  }
  ,[]);
 */
  //Enviar los datos al backend

  const sendCredentials = () => {
	fetch('http://localhost:5101/api/Auth/Login', {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then((response) => response.json())
	.then((json) => console.log('datos enviados',json));
  }
  const forgotPassword = () => {
    navigate(routes.FORGOTPASSWORD); // Redirige correctamente

console.log('Rutas importadas:', routes);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row h-screen w-screen">
        <div className="sm:w-1/2 p-8 flex flex-col justify-center">
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
          <form 
		   onSubmit={handleSubmit}
		  className="space-y-4"
		 >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="email"
				name="email"
				value={credentials.email}
				onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa tu usuario"
              />
			  <ToastContainer />
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
				name="password"
				value={credentials.password}
				onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
			  <ToastContainer />
            </div>
            <div className="flex items-center">
              <input
			  onChange={saveCredentials}
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-blue-500">
                Recuérdame
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
			  
            >
              Inicio de Sesión
            </button>
            <div className=" hidden sm:flex items-center flex-col">
              <button
			        onClick={forgotPassword} //Cambiar 
                id="forgot"
                type="button"
                className="border-gray-300 rounded focus:ring-blue-500 text-sm text-blue-500 "
              >Olvidé Contraseña
              </button>
            </div>
          </form>
        </div>
        {/* Columna Derecha: Imagen */}
        <div
          className="sm:flex sm:w-1/2 bg-gray-900 flex-col justify-between"
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
    </div>
  );
};
export default Login;

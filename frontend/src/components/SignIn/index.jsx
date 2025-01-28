import React, { useEffect, useState } from "react";
import logo from "../../assets/logobanco.webp";
import login from "../../assets/login1.png"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { routess} from "../../utils/routes.jsx";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Login = () => {

	//estado para guardar los datos del formulario
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [rememberMe, setRememberMe] = useState(false); // Estado para el select
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const routes = routess();

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
		toast.error("Ingresá los datos de su usuario!");
			return false;
		}
		if (credentials.email.length < 8 || credentials.password.length < 8) {
			toast.error("El nombre de usuario y la contraseña deben tener al menos 8 caracteres.");
			return false;
		}

    const userExist = checkUserExists(credentials.email);
    if(!userExist){
      toast.error("El usuario no fue encontrado!!");
      return false
    }
		return true;
	}

  const checkUserExists = async (email) => {
    try {
      const response  = await fetch(`http://localhost:5101/Account/GetByEmail?email=${encodeURIComponent(email)}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      }); 
      if(Response.ok){
        const data = await response.json();
        return data.exists; 

      }else {
        toast.error("Usuario no encontrado");
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      setErrorMessage(error.message);  // Aquí actualizamos el estado de error
    }
 
  };


  //Envia los datos del formulario

  const handleSubmit = (e) => {
    console.log(credentials);
	  e.preventDefault();
    if (rememberMe) {
      saveCredentials(); // Guarda las credenciales en el localStorage si "Recordar credenciales" está marcado
    }
	  if (validateForm()) {
    fetch('http://localhost:5101/api/Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

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
    const token = response.json();
      console.log('Token recibido:', token);
      // Guardar el token en localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('credentials', JSON.stringify(credentials));
      // Redirigir a la página principal
    navigate(routes.HOME);
  })
  
    .catch((error) => {
        console.error('Error en la solicitud:', error.message);
        setErrorMessage(error.message);  
    });
      console.log("Formulario enviado", credentials); 
    }
  }
  //guarda los datos en el local storage

  const saveCredentials = () => {
	localStorage
	.setItem('credentials', JSON.stringify(credentials));
  }

    //Obtiene las credenciales del localStorage
  const getCredentials = () => {
    const credentials = localStorage.getItem('credentials');
  console.log('credenciales',credentials)
	if(credentials){
	  setCredentials(JSON.parse(credentials)); // Si existen, carga las credenciales en el estado
      setRememberMe(true); // Marca el checkbox de recuerdame
	}
	  };

    //checkbox para guardar los datos.
  const  handleRememberCredentials =(e)=>{
      e.preventDefault();
      setRememberMe(e.target.checked);
      if (!e.target.checked) {
        localStorage.removeItem('credentials');
        setCredentials({ email: "", password: "" });
      }
    };

    useEffect(()=>{
      getCredentials();
    },[]);


    //olvide contraseña
  const forgotPassword = () => {
    navigate(routes.FORGOTPASSWORD); 
  };

  //redirige a la pagina de registro
  const signUp =()=>{
    navigate(routes.REGISTER)
  }

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
            <div className="relative mt-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
				        name="password"
				        value={credentials.password}
				        onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                placeholder="********"
              />
              <button
          type="button"
          onClick={() => setShowPassword(!showPassword)} // Cambiar visibilidad
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ?<FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/> } {/* Cambiar ícono "🙈" : "👁️"*/}
        </button>
			  <ToastContainer />
            </div>
            <div className="flex items-center">
              <input
	      		  onChange={handleRememberCredentials}
                id="remember"
                type="checkbox"
                checked={rememberMe}
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
			        onClick={forgotPassword}
                id="forgot"
                type="button"
                className="border-gray-300 rounded focus:ring-blue-500 text-sm text-blue-500 "
              >Olvidé Contraseña
              </button>
            </div>
            <div className="flex-row flex items-center pt-10">
              <label className="flex flex-row px-5 font-bold">¿No estás registrado?</label>
              <button
			        onClick={signUp} 
                id="signUp"
                type="button"
                className="border-gray-300 rounded focus:ring-blue-500 text-sm text-red-600 "
              >Registrate ahora
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
          <div className="flex flex-col">
            <img src={logo} alt="Logo" className="w-32 mx-auto mt-4" />
          </div>
          <div className="w-64 h-64 flex justify-center items-center mx-auto bg-white border rounded-full sm:w-96 sm:h-96">
              <img src={login} alt="login" className="w-64 mx-auto mt-4 sm:w-96"/>
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

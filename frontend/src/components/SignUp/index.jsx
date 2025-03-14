import React, { useState } from "react";
import logo from "../../assets/logobanco.webp";
import { toast, ToastContainer} from "react-toastify";
import registro from '../../assets/registro.png';
import registro2 from '../../assets/registro2.jpg';
import { routess } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
const Register =()=>{

const [datos,setDatos]=useState(
	{
		email:"",
		password:"",
		name:"",
		surname:"",
		role: "usuario",
		phone:"",
		address:"",
		iden:"",

	}
)

const [roles] = useState(["empresa", "usuario"]); // Opciones disponibles
const [selectedRole, setSelectedRole] = useState(""); // Rol seleccionado
const [errorMessages, setErrorMessages] = useState([]);
const [successMessage, setSuccessMessage] = useState([]);

const API_URL = import.meta.env.VITE_API_URL;

const navigate = useNavigate();
const routes = routess();


  const handleChangeData = (e) => {
	e.preventDefault();
	const {name, value}=e.target;
    setDatos({
      ...datos, 
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	console.log("Datos enviados:", datos);
	
	try {
	  const response = await fetch(`${API_URL}/api/Auth/Registro`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		mode: 'cors',
		body: JSON.stringify(datos),
	  });
  

	  const textResponse = await response.json();
	  console.log("Respuesta del servidor:", textResponse);
  
	  if (response.ok) {
		toast.success("Registro completado!");
		setDatos({
		  email: "",
		  password: "",
		  name: "",
		  surname: "",
		  phone: "",
		  role: "",
		  address: "",
		  iden: ""
		});

  
	  } else {
	
		const errorData = await response.json();
			if (errorData.error) {
				toast.error(errorData.error);
				} else if (errorData.errors) {
					Object.values(errorData.errors).flat().forEach(err => {
					toast.error(err); 
				});
		} else {
			setErrorMessages(["Ocurrió un error inesperado."]);
		}
	  }
  
	} catch (error) {
	  console.error('Error:', error.message);
	  setErrorMessages([error.message]); 
	  toast.error("Error en la conexión o en el envío de los datos.");
	}
  };
  
  const closed = () => {
    navigate(routes.LOGIN);
  };

	return(
		<>
		<div className="flex flex-col sm:flex-row h-screen w-screen">
			<div className="sm:w-1/2 p-8 flex flex-col justify-center">
			<div>
				<div>
					<div className="sm:hidden">
						<img src={logo} className="h-12 w-12"/>
					</div>
					<div className="flex flex-col items-center justify-center">
						
						<h1 className="text-4xl font-mon text-blue-950 font-bold sm:py-5 my-3 ">Registrate</h1>
						<p>Bienvenido!</p>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center pb-1">
				<img src={registro2} className="w-24 text-blue-600"/> {/* className=" w-80 mx-auto mt-40 border rounded" */}
					{/* <img src={registro}  className="w-20 text-blue-600"/> */}
				</div>
			</div>
				<div className="flex flex-col items-center mb-6 border rounded-xl border-gray-600 py-1 mx-3 shadow-lg shadow-gray-700 bg-gradient-to-r from-gray-100 to-gray-300">
					<form onSubmit={handleSubmit} className="w-full sm:w-96">
						<div className="flex flex-col lg:flex-row items-center mx-3">
						<label className="block text-sm font-medium text-gray-700 px-4">Tipo de cuenta:</label>
						<select
                			id="role"
							name="role"
                			value={datos.role}
                			onChange={handleChangeData}
                			className="border rounded px-4 py-2 my-2 w-full sm:w-72 h-12 lg:my-3"
                			placeholder="1-555-98-71"
                	
             			>
   						<option value="">-- Selecciona un rol --</option>
     					 {roles.map((role) => (
        					<option key={role} value={role}>
          						{role.charAt(0).toUpperCase() + role.slice(1)} 
        				</option>
      ))}
						</select>
						</div>
						<div className="flex flex-col lg:flex-row items-center mx-3">
						<label className="block text-sm font-medium text-gray-700 px-2">Correo electrónico:</label>
						<input
                			type="email"
                			id="email"
							name="email"
                			value={datos.email}
                			onChange={handleChangeData}
                			className="border rounded px-4 py-2 my-2 w-full sm:w-72 h-12 lg:my-3"
                			placeholder="tuemail@example.com"
                			required
             			/>
						</div>
						<div className="flex flex-col lg:flex-row items-center mx-3">
						<label className="block text-sm font-medium text-gray-700 px-4">Contraseña:</label>
						<input
                			type="password"
                			id="password"
							name="password"
                			value={datos.password}
                			onChange={handleChangeData}
                			className="border rounded px-4 py-2 my-2 w-full sm:w-72 h-12 lg:my-3"
                			placeholder="********"
                			required
							title="La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
             			/>			
						</div>
			
						<div className="flex flex-col lg:flex-row items-center mx-3">
						<label className="block text-sm font-medium text-gray-700 px-4">Nombre(s):</label>
						<input
                			type="text"
                			id="name"
							name="name"
                			value={datos.name}
                			onChange={handleChangeData}
                			className="border rounded px-4 py-2 my-2 w-full sm:w-72 h-12 lg:my-3"
                			placeholder="Homero"
                			required
             			/>
						</div>
						<div className="flex flex-col lg:flex-row items-center mx-3">
						<label className="block text-sm font-medium text-gray-700 px-4">Apellido(s):</label>
						<input
                			type="text"
                			id="surname"
							name="surname"
                			value={datos.surname}
                			onChange={handleChangeData}
                			className="border rounded px-4 py-2 my-2 w-full sm:w-72 h-12 lg:my-3"
                			placeholder="Simpson"
                			required
             			/>
						</div>
						<div className="flex flex-col lg:flex-row items-center mx-3">
						<label className="block text-sm font-medium text-gray-700 px-4">CI/DNI/CUIT:</label>
						<input
                			type="text"
                			id="iden"
							name="iden"
                			value={datos.iden}
                			onChange={handleChangeData}
                			className="border rounded px-4 py-2 my-2 w-full sm:w-72 h-12 lg:my-3"
                			placeholder="4043243"
                			required
             			/>
						</div>
						<div className="flex flex-col lg:flex-row items-center mx-3">
						<label className="block text-sm font-medium text-gray-700 px-4">Teléfono:</label>
						<input
                			type="text"
                			id="phone"
							name="phone"
                			value={datos.phone}
                			onChange={handleChangeData}
                			className="border rounded px-4 py-2 my-2 w-full sm:w-72 h-12 lg:my-3"
                			placeholder="555-5555"
                			required
             			/>
						</div>
						<div className="flex flex-col lg:flex-row items-center mx-3">
						<label className="block text-sm font-medium text-gray-700 px-4">Dirección:</label>
						<input
                			type="text"
                			id="address"
							name="address"
                			value={datos.address}
                			onChange={handleChangeData}
                			className="border rounded px-4 py-2 my-2 w-full sm:w-72 h-12 lg:my-3"
                			placeholder="742 de Evergreen Terrace"
                			required
             			/>
						</div>
						 <div className="flex flex-col lg:flex-row items-center text-sm lg:my-3">
						 <button
              				type="submit"
							  className={`py-2 rounded-lg sm:w-ful mx-50 sm:px-20 ${
								datos.role
									? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
									: "bg-gray-400 text-gray-100 cursor-not-allowed"
							}`}
							disabled={!datos.role}>
              				Registrase
           				</button>
						   <button
              				type="button"
							onClick={closed}
              				className="bg-gray-700 text-white mx-3 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500  sm:w-ful mx-50 sm:px-20"
            			>
              				Volver
           				</button>
						   <ToastContainer />
            			</div>
					</form>
					<div>
					{errorMessages.length > 0 && (
                <div style={{ color: "red" }}>
                    {errorMessages.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
			</div>
				</div>
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

export default Register;
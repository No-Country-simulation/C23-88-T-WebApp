import { faCheck, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";



const OffCanvas =({isOffCanvas, ClosedOffCanvas })=>{

	const [newUser, setNewUser] = useState('');
	const [isAmount,setIsAmount]=useState(0);
	const [rememberMe, setRememberMe] = useState(false); 
	const [name,setName]=useState('');
	const[surname,setSurname]=useState('');
	const[userData,setUserData]=useState('');
	const [erromessages, setErrorMessages] =([]);

	const handleData = (e) => {
		e.preventDefault();
		const value = (e.target.value.trim());
		if (isNaN(value) || value === 0) {
			console.warn("CBU no válido");
			return;
		}
		console.log('Tomando el CBU', value);
		setNewUser(value);
	};
	

	const handleinputAmount = (e)=>{
		e.preventDefault();
		const value =e.target.value
		console.log("tomando el monto",value)
		setIsAmount(value);

	}

	const handleSearchUser =async (e)=>{
		try {
			e.preventDefault();
			const userId = newUser || ""; 

			if (!userId) {
				console.warn("No hay ID de usuario para buscar");
				return;
			}
			console.log("Buscando usuario con ID:", userId);
			const response = await fetch(`http://localhost:5101/api/Contacts/GetContactList?id=${userId}`,{
				method:'GET',
				headers:{
				'Content-Type':'application/json'		
				},
				mode:'cors',
			});

			if (!response.ok) {
				throw new Error(`Error en la solicitud: ${response.statusText}`);
			}
	
			const data = await response.json();
			if (data.success && data.data.length > 0) {
				console.log("Usuario encontrado:", data.data[0]);
				const user = data.data[0];
				setUserData(user); 
				setName(user.name);
				setSurname(user.surname)
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
				setUserData(null);
			}
		} catch (error) {
			toast.error('error al traer la info del usuario',error)
		}
	
	}
	 const  handleRememberCredentials =(e)=>{
		  e.preventDefault();
		  setRememberMe(e.target.checked);
		  if (!e.target.checked) {
			setNewUser({ id: "" });
		  }
		};
	
	const SendTranfer= async(e)=>{
		e.preventDefault()
		try {
					// Validar que el monto sea mayor a 0
			if (isAmount <= 0) {
				toast.error('El monto debe ser mayor a 0');
				return;

			}
				const response = await fetch(`http://localhost:5101/Balance/AddBalance`, {
					method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						mode: 'cors',
						body: JSON.stringify({
							account_id: newUser,
							value: isAmount,
						}),
					
					})
					console.log('datos enviados',response)
					if (response.ok) {
						const data = await response.json();
					toast.success("Tranferencia exitosa!");
						setIsAmount(0);
						setNewUser(null);
					} else {
						toast.error('error en la transferencia', response);
					}
			
		} catch (error) {
			console.error(error.message);		
		}	
			
	}

	return(
		<>
			{isOffCanvas && (
       		<div
	   			className={`fixed top-0 right-0 transform h-full max-w-xs w-full z-[80] bg-gray-100 border-s dark:bg-neutral-800 dark:border-neutral-700 
				transition-all duration-300 ease-in-out ${isOffCanvas ? 'translate-x-0' : 'translate-x-full'}`}
	   			role="dialog"
	   			aria-labelledby="hs-offcanvas-right-label"
	 		>
				<ToastContainer/>
        		<div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
        		  <h3 id="hs-offcanvas-right-label" className="font-bold text-gray-800 dark:text-white">
        		    Datos del Beneficiario
        		  </h3>
        		  <button
        		    type="button"
        		    className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
        		    aria-label="Close"
        		    onClick={ClosedOffCanvas} // Cerramos el offcanvas
        		  >
        		    <span className="sr-only">Close</span>
        		    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        		      <path d="M18 6L6 18" />
        		      <path d="M6 6L18 18" />
        		    </svg>
        		  </button>
        		</div>
        		<div className="border border-gray-800 rounded-2xl w-44 ml-4 p-4 mt-4">
        		  <p className="text-gray-800 dark:text-neutral-400">
					<FontAwesomeIcon icon={faCheck} className="mx-2"/>
        		  	CBU/CVU:
        		  </p>
        		</div>
				<div className="flex flex-col justify-center items-center m-5">
					<p>Ingrese el número de CBU:</p>
					<input  
					className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-30"
					type="number"
					id="accountUser"
					name="accountUser"
					value={newUser || ''}
					onChange={handleData}
					/>
				</div>
				<div className="mb-4 relative inline-block">
					<button 
					className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-30 hover:bg-gray-500 hover:text-black"
					type="button"
					id="searchUser"
					name="searchUser"
					value={newUser || ''}
					onClick={handleSearchUser}
					>Buscar
					</button>
					<FontAwesomeIcon icon={faMagnifyingGlass}
					style={{
						position: 'absolute',
						left: '10px',
						top: '50%',
						transform: 'translateY(-50%)',
						color: '#999'
					  }}
					/>
				</div>
				<div className="flex flex-col justify-center items-center m-5">
					<p>Ingrese el Monto:</p>
					<input  
					className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-30"
					type="number"
					id="amount"
					name="amount"
					value={isAmount}
					onChange={handleinputAmount}
					/>
				</div>
				<div>
				<div className="flex flex-col justify-center items-center m-5">
					<p>Nombre(s):</p>
					<input  
					className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-30"
					type="text"
					id="name"
					name="name"
					value={name}
					disabled={true}
					/>
				</div>
				<div className="flex flex-col justify-center items-center m-5">
					<p>Apellido(s):</p>
					<input  
					className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-30"
					type="text"
					id="surname"
					name="surname"
					value={surname}
					disabled={true}
					/>
				</div>
				</div>
				<div className="flex items-center mx-2">
              <input
	      		onChange={handleRememberCredentials}
                id="remember"
                type="checkbox"
                checked={rememberMe}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-blue-500">
                Guardar contactos frecuentes
              </label>
            </div>
				<div className="flex flex-col flex-1 justify-center items-center">
					<button type="button"
					 className="bg-blue-600 border rounded-xl p-4 m-4 text-white font-semibold items-end"
					 onClick={SendTranfer}
					 >Enviar</button>
				</div>
        	</div>
			)}					
		</>
	)
}

export default OffCanvas;
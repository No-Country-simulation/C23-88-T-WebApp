import { faCheck, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";



const OffCanvas =({isOffCanvas, ClosedOffCanvas })=>{

	const [accountId,setAccountId]=useState('');
	const [newUser, setNewUser] = useState('');
	const [isAmount,setIsAmount]=useState(0);
	const [rememberMe, setRememberMe] = useState(false); 
	const[userData,setUserData]=useState([]);
	const [name,setName]=useState('');
	const[surname,setSurname]=useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const [isOpen, setIsOpen] = useState(false); 
	const [errorMessages, setErrorMessages] = useState([]);
	const [successMessage, setSuccessMessage] = useState("");
	const API_URL = import.meta.VITE_API_URL;

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


	const handleSearchUser = async (e) => {
		try {
		  e.preventDefault();
		  const userId = newUser.trim();
	  
		  if (!userId) {
			toast.warn("Ingrese un ID de usuario válido");
			return;
		  }
	  
		  console.log("Buscando usuario con ID:", userId);
	  
		  const response = await fetch(`${API_URL}/Balance/GetById?id=${userId}`, {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json',
			},
			mode: 'cors',
		  });
	  
		  console.log("Respuesta HTTP:", response);
	  
		  if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.statusText}`);
		  }
	  
		  const user = await response.json(); 
	  
		  console.log("Datos recibidos:", user);
	  

		  if (user && user.account_id) {
			console.log("Usuario encontrado:", user);
			setUserData(user);
			setName(user.name);
			setSurname(user.surname);
			toast.success("Usuario encontrado");
		  } else {
			toast.error("Usuario no encontrado");
			setUserData(null);
		  }
		} catch (error) {
		  console.error("Error en la solicitud:", error);
		  toast.error(`Error al traer la info del usuario: ${error.message}`);
		}
	  };
	  
	  //Modal 

	  const OpenModal =()=>{
	    setIsOpen(true)


	  }

	const ClosedModal =()=>{
	  setIsOpen(false);
	}


	  const handleRememberCredentials = (e) => {
		e.preventDefault();
		const checked = e.target.checked;
		setRememberMe(checked);
		if (checked) {
		  OpenModal();  
		  setIsOpen(true);  
		}
	  };

	  const storedCredentials = localStorage.getItem('credentials');
			
				useEffect(() => {
					if (storedCredentials) {
					  const credentials = JSON.parse(storedCredentials);
					  const { email } = credentials;
					  getUser(email);
			
					}
				  }, [storedCredentials]);
		
		const getUser = async (email) => {
			try {
				const response = await fetch(`${API_URL}/Account/GetByEmail?email=${email}`);
				if (!response.ok) {
					throw new Error("Error al obtener los datos del usuario. Cuenta no encontrada.");
				}
				const data = await response.json();
				setUserData(data);
				setAccountId(data.account_id);
			
			} catch (err) {
				console.error(err.message);
			}
		}
	  
	console.log('accountId',accountId)

	//GUARDAR EL USUARIO

	const savedUserNew =async()=>{

		const userId = newUser.trim();
		console.log('click para guardar')
		try {
			const response = await fetch(`${API_URL}/api/Contacts/AddContact?currentUserId=${accountId}&identifier=${userId}`,{
				method:'POST',
				headers:{
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			});
	
			const data = await response.json();
			toast.success
			console.log("Respuesta HTTP:", data);

			if (!response.ok) {
			  throw new Error(`Error en la solicitud: ${response.statusText}`);
		
			}

			if (data.message) {
				console.log("Mensaje:", data.message);
				toast.success(data.message || "Registro completado!"); // Muestra el mensaje de éxito
				ClosedModal();
			}
			return data;

		} catch (error) {
			console.log('error de datos')
		}

	}

	const SendTranfer= async(e)=>{
		e.preventDefault()
		try {
					// Validar que el monto sea mayor a 0
			if (isAmount <= 0) {
				toast.error('El monto debe ser mayor a 0');
				return;

			}
				const response = await fetch(`${API_URL}/Balance/Transaction`, {
					method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						mode: 'cors',
						body: JSON.stringify({
							from_id: accountId,
							send_balance: isAmount,
							to_id: newUser,
						}),
					
					})
					console.log('datos enviados',response)
					if (response.ok) {
						const data = await response.json();
					toast.success("Tranferencia exitosa!");
						setIsAmount(0);
						setNewUser(null);
						setName('');
						setSurname('');
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
					onChange={(e) => setName(e.target.value)}
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
					onChange={(e) => setSurname(e.target.value)}
					disabled={true}
					/>
				</div>
				</div>
				<div className="p-2">
					{isMenuOpen && (
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
					  {isOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                              </div>
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-base font-semibold text-gray-900" id="modal-title">Guardar contactos frecuentes</h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">¿Estás seguro que deseas guardar el beneficiario como frencuente?</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              onClick={savedUserNew}
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto"
                            >
                              Guardar
                            </button>

                            <button
                              onClick={ClosedModal} // Cerrar el modal
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                      )}
            	</div>
				)}
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
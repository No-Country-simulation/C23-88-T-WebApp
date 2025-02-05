import React, { useState,useEffect } from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";
import { SpinnerCircular } from 'spinners-react';
import { toast } from "react-toastify";

const Home = ()=> {
	const [userData, setUserData] = useState(null)
	const [balance,setBalance]=useState(null);
	const [userName, setUserName] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setIsLoading] = useState(true);
	const [accountId, setAccountId] = useState(null); 
	const API_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_LOCAL_API_URL;


	const storedCredentials = localStorage.getItem('credentials');
	
	useEffect(() => {
		// Si las credenciales existen, obtenemos el email
		if (storedCredentials) {
		  const credentials = JSON.parse(storedCredentials);
 
		  const { email } = credentials; 
		  setIsLoading(true);
			fetchUser(email); 	  


		}
	  }, [storedCredentials]);
	
	  // Función para obtener el nombre del usuario desde la API
	  const fetchUser = async (email) => {
		try {
		  const response = await fetch(`${API_URL}/Account/GetByEmail?email=${email}`);
			
		  if (!response.ok) {
			throw new Error("Error al obtener los datos del usuario. Cuenta no encontrada.");
		  }
	
		  const data = await response.json();
		 
		  setUserName(data.name);
		  setUserData(data);
		  setAccountId(data.account_id);
		  setIsLoading(false); 
		} catch (err) {
			setIsLoading(false);
		  setErrorMessage(err.message);
		  setIsLoading(false);
		} 
	  };

	  	  // useEffect para obtener el balance cuando el accountId cambia
			useEffect(() => {

				if (accountId !== null) {
					setIsLoading(true);
					fetchBalance();
				} else {
				
				  setIsLoading(false);  
				}
			  }, [accountId]); 
		
	
	
	  const fetchBalance = async () => {
		console.log('pasamos la cuenta', accountId);  
		if (!accountId) { 
			toast.error("La cuenta no está disponible!");
			return;
		  }
		
		try {
		  const response = await fetch(`${API_URL}/Balance/GetBalancebyAccountId?Id=${accountId}`);
		  console.log('viendo la url',response)
		  if (!response.ok) {
			throw new Error("Error al obtener el saldo. Cuenta no encontrada.");
		  }
	
		  const data = await response.json();
		  setBalance(data.balance); 
		  setIsLoading(false); 
		} catch (error) {
			console.error("Error en fetchBalance:", error);
			toast.error(error.message || "Error al obtener el saldo.");
			setIsLoading(false);
		  
		}
	  };
	
	return(
		<>
		    <NavBar />
      		<div className="h-screen flex justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
      		  <SideBar />
      		  {loading ? (
      		    <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-gray-700 bg-opacity-50 z-50">
      		      {/* Spinner en el centro de la pantalla */}
					<SpinnerCircular size={50} thickness={121} speed={87} color="rgba(57, 172, 119, 1)" secondaryColor="rgba(57, 121, 172, 0.44)" />
      		    </div>
      		  ) : (
      		    <div className="w-5/6 bg-gray-100 lg:w-full flex flex-col lg:bg-gray-100 relative">
      		      {userData && (
      		        <div className="text-center text-4xl font-bold text-gray-500 pb-10 border-b-2 border-gray-200">
      		          <h1>Bienvenido {userName}!</h1>
      		        </div>
      		      )}
      		      {userData && (
      		        <div className="flex flex-col justify-center py-10 sm:py-20">
      		          <h3 className="font-mono font-bold mx-4">Mis Cuentas:</h3>
      		          <div className="flex flex-row items-center justify-around border-4 rounded-lg shadow-xl bg-white border-gray-200 py-4 px-2 mx-2 mt-4 md:px-32 md:mx-5 md:justify-between">
      		            <div>Cuenta{accountId}</div>
      		            <p className="font-bold">
      		              {balance ? `$${balance.toFixed(2)}` : 'No disponible'}
      		            </p>
      		          </div>
      		        </div>
      		      )}
      		      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      		    </div>
      		  )}
      		</div>
		</>
	)
}

export default Home;
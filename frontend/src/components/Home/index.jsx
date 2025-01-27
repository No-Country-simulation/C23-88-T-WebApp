import React, { useState,useEffect } from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";
import { SpinnerCircular } from 'spinners-react';

const Home = ()=> {
	const [userData, setUserData] = useState(null)
	const [balance,setBalance]=useState(null);
	const [userName, setUserName] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setIsLoading] = useState(true);
	const [accountId, setAccountId] = useState(null); 


	const storedCredentials = localStorage.getItem('credentials');

	useEffect(() => {
		// Si las credenciales existen, obtenemos el email
		if (storedCredentials) {
		  const credentials = JSON.parse(storedCredentials);
		//  setAccountId(credentials.account_id);	  
		  const { email } = credentials; // Extraemos el email
	
		  // función que obtiene los datos del usuario
		  fetchUser(email);

		}
	  }, [storedCredentials]);
	
	  // Función para obtener el nombre del usuario desde la API
	  const fetchUser = async (email) => {
		try {
		  const response = await fetch(`http://localhost:5101/Account/GetByEmail?email=${email}`);
			
		  if (!response.ok) {
			throw new Error("Error al obtener los datos del usuario. Cuenta no encontrada.");
		  }
	
		  const data = await response.json();
		 
		  setUserName(data.name);
		  setUserData(data);
		  setAccountId(data.account_id);
		  setIsLoading(false); 
		  console.log('esta es la variable de account',accountId) //Asumimos que 'data.name' es el nombre del usuario
		} catch (err) {
		  setErrorMessage(err.message);
		  setLoading(false);
		} 
	  };
	
	
	  const fetchBalance = async () => {
		console.log('pasamos la cuenta', accountId);  // Verificamos que accountId sea el correcto
		if (accountId === null) {
		  console.log('El accountId aún no está disponible');
		  return;
		}
		
		try {
		  const response = await fetch(`http://localhost:5101/Balance/GetBalancebyAccountId?Id=${accountId}`);
		  
		  if (!response.ok) {
			throw new Error("Error al obtener el saldo. Cuenta no encontrada.");
		  }
	
		  const data = await response.json();
		  console.log('Datos de saldo:', data);  // Verificamos los datos del saldo
	
		  setBalance(data.balance);  // Asumimos que 'data.balance' es el saldo
		  setIsLoading(false); 
		} catch (err) {
		  setErrorMessage(err.message);
		  setLoading(false);  // Desactivamos el estado de carga al finalizar
		}
	  };
	
	  // useEffect para obtener el balance cuando el accountId cambia
	  useEffect(() => {
		console.log('El accountId es:', accountId); 
		if (accountId !== null) {
		  console.log('Llamando a fetchBalance con accountId:', accountId);  
		  fetchBalance();  // Llamamos a fetchBalance
		} else {
		  console.log('Aún no hay accountId');
		  setIsLoading(false);  
		}
	  }, [accountId]); 


	
	return(
		<>
		    <NavBar />
      		<div className="h-screen flex justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
      		  <SideBar />
      		  {loading ? (
      		    <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-gray-700 bg-opacity-50 z-10">
      		      {/* Spinner en el centro de la pantalla */}
					<SpinnerCircular size={50} thickness={121} speed={87} color="rgba(57, 172, 119, 1)" secondaryColor="rgba(57, 121, 172, 0.44)" loading={loading} />
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
      		            <div>Cuenta xxxx {accountId}</div>
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
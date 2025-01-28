import React, { useState,useEffect } from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";

const MoveHistory =()=>{

	const [history,setHistory]=useState([]);
	const [userData, setUserData] = useState(null);
	const [accountId, setAccountId] = useState(null); 
	const [isLoading, setIsLoading] = useState(true);

	const storedCredentials = localStorage.getItem('credentials');
	
		useEffect(() => {
			// Si las credenciales existen, obtenemos el email
			if (storedCredentials) {
			  const credentials = JSON.parse(storedCredentials);
			//  setAccountId(credentials.account_id);	  
			  const { email } = credentials; // Extraemos el email
			  console.log('extrayendo el email',credentials.email)
		
			  // función que obtiene los datos del usuario
			  getUser(email);
	
			}
		  }, [storedCredentials]);


const getUser = async (email) => {
	try {
		const response = await fetch(`http://localhost:5101/Account/GetByEmail?email=${email}`);
		if (!response.ok) {
			throw new Error("Error al obtener los datos del usuario. Cuenta no encontrada.");
		}
		const data = await response.json();
		setUserData(data);
		setAccountId(data.account_id);
		console.log('datos de la cuenta',data.account_id)
		getHistory(data.account_id);
	} catch (err) {
		console.error(err.message);
	}
}

	const getHistory = async (accountId) => {	

		console.log('pasamos la cuenta', accountId);

		if (accountId === null) {
			console.log('El accountId aún no está disponible');
			return;
		  }
		try {
			const response = await fetch(`http://localhost:5101/Balance/GetHistory?Id=${accountId}`,{
				method: 'GET',
				headers: {
				  'Content-Type': 'application/json',
				},
				mode: 'cors',
			});

			console.log('viendo la cuenta', accountId);
			if (!response.ok) {
				throw new Error("Error al obtener los movimientos");
			}
			const datosHistory = await response.json();
			console.log('datos del json de data',datosHistory)
			 if (!datosHistory || datosHistory.length === 0) {
				console.log('No hay movimientos disponibles.');
				setHistory([]); // Guarda un array vacío si no hay movimientos
	 
				return;
			}

			console.log('Movimientos obtenidos:', datosHistory);
			setHistory(datosHistory); // Guarda el array completo

			  // Extraemos los valores de interés
			  datosHistory.forEach(movimiento => {
				console.log('Value:', movimiento.value);
				console.log('Type:', movimiento.type);
				console.log('Date:', movimiento.date);
				setIsLoading(false);
			});
		} catch (err) {
			console.error(err.message);
			setIsLoading(false); 
		}
	} 
	return (
		<>
		<NavBar/>
		<div className="h-screen flex justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
			<SideBar/>
			<div className="w-5/6 lg:w-full flex flex-col bg-gray-100">
				<div className="py-4 mx-4 font-semibold">
					<h1>Ultimos Movimientos</h1>
				</div>
				<div className="flex flex-row justify-around font-mono px-32 py-5 text-start bg-gray-500 text-white">
					<p>Cuenta seleccionada:</p>
					<p>xxxxx{accountId}</p>
				</div>
				<div className="w-5/6 lg:w-full flex flex-col md:flex-col justify-around gap-4 my-20">
					<table className="table-auto mx-2 my-8 md:mx-24">
					  <thead>
					    <tr>
					      <th className="text-left px-4 mx-4 border-4 text-lg border-y-gray-500">Fecha</th>
					      <th className="text-left px-4 mx-4 border-4 text-lg border-y-gray-500">Concepto</th>
					      <th className="text-left px-4 mx-4 border-4 text-lg border-y-gray-500">Importe</th>
					    </tr>
					  </thead>
					  <tbody className="grow shrink-0">
						 {history && history.length > 0 ? (
							 history.map((move, index) => (
							<tr key={index}>
								<td className="text-left pl-4 mx-4 border-2 border-y-gray-500">
        						  {new Date(move.date).toLocaleDateString()} {/* Fecha */}
        						</td>
        						<td className="text-left pl-4 mx-4 border-2 border-y-gray-500">
        						  {move.type} {/* Tipo */}
        						</td>
        						<td className="text-left pl-4 mx-4 border-2 border-y-gray-500">
        						  {move.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} {/* Valor */}
        						</td>

							</tr>
						))
						) : (
						    <tr>
      							<td colSpan="3" className="text-center border-2 border-y-gray-500">
      							  No hay movimientos disponibles
      							</td>
   							</tr>
						)}  		
					  </tbody>
					</table>
				</div>
			</div>
		</div>
		</>
	)
}

export default MoveHistory;
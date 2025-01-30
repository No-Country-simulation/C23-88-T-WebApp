import React, { useState,useEffect } from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";
import { ToastContainer, toast } from 'react-toastify';

const MoveHistory =()=>{

	const [history,setHistory]=useState([]);
	const [userData, setUserData] = useState(null);
	const [accountId, setAccountId] = useState(null); 
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages]= useState(1)
	const storedCredentials = localStorage.getItem('credentials');
	
		useEffect(() => {
			// Si las credenciales existen, obtenemos el email
			if (storedCredentials) {
			  const credentials = JSON.parse(storedCredentials);
			//  setAccountId(credentials.account_id);	  
			  const { email } = credentials; // Extraemos el email
			  console.log('extrayendo el email',credentials.email)
			  setIsLoading(true);
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
		setIsLoading(false);
	} catch (err) {
		console.error(err.message);
		setIsLoading(false);
	}
}

	const getHistory = async (accountId, page = 1) => {	

		if (!accountId) {
            toast.error("La cuenta no está disponible!");
            return;
        }
		try {
			const limit = 15;
        	const offset = (page - 1) * limit;

			const response = await fetch( `http://localhost:5101/Balance/GetHistory?Id=${accountId}&limit=${limit}&offset=${offset}`,{
				method: 'GET',
				headers: {
				  'Content-Type': 'application/json',
				},
				mode: 'cors',
			});

			if (!response.ok) {
				throw new Error("Error al obtener los movimientos");
			}
			const datosHistory = await response.json();
			 if (!datosHistory || datosHistory.length === 0) {
				setHistory([]); 
                setTotalPages(1)
				return;
			}

			setHistory(datosHistory);
			let totalResults = response.headers.get('X-Total-Count');

			if (!totalResults) {
				console.warn("X-Total-Count no está disponible en los headers.");
				
				// Alternativa: Verificar si el JSON incluye el total de registros
				if (datosHistory.total) {
					totalResults = datosHistory.total;
				} else if (Array.isArray(datosHistory) && datosHistory.length > 0 && datosHistory[0].total) {
					totalResults = datosHistory[0].total;
				}
			}
	
			console.log("Total de registros:", totalResults);
	
			if (totalResults) {
				const totalPagesCalc = Math.ceil(totalResults / limit);
				setTotalPages(totalPagesCalc);
			}
			  setIsLoading(false); 
		} catch (err) {
			console.error(err.message);
			setIsLoading(false); 
		}
	} 

	const changePage = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
            console.log("Cambiando a página:", newPage);
            setCurrentPage(newPage);
        }
	};
	
	return (
		<>
		<NavBar/>
		<div className="h-screen flex justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
			<SideBar/>
			<div className="w-5/6 lg:w-full flex flex-col bg-gray-100">
				<ToastContainer />
				<div className="py-4 mx-4 font-semibold">
					<h1>Ultimos Movimientos</h1>
				</div>
				<div className="flex flex-row justify-center  font-mono py-5 text-start bg-gray-500 text-white px-5 md:justify-around lg:px-32">
					<p>Cuenta seleccionada:</p>
					<p>xxxxx{accountId}</p>
				</div>
				<div className="w-5/6 lg:w-full flex flex-col md:flex-col justify-around  bg-gray-100">
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
				<div className="flex flex-row justify-around font-mono px-32 py-5 text-start bg-gray-500 text-black">
        			<div>
        			    <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}
							className="text-white no-underline hover:underline "
							>
        			        Anterior
        			    </button>
        			    <span className="text-blue-200"> Página {currentPage} de {totalPages} </span>
        			    <button onClick={() => changePage(currentPage + 1)}disabled={currentPage === totalPages} 
							className="text-white no-underline hover:underline "
							>
        			        Siguiente
        			    </button>
        			</div>
    			</div>
			</div>
		</div>
		</>
	)
}

export default MoveHistory;
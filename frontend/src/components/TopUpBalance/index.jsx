import React, {useState,useEffect} from "react"; 
import NavBar from "../Navbar/index.jsx";
import SideBar from "../SideBar";
import { routess } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer} from "react-toastify";

const TopUpBalance = () => {

	const routes = routess();
	const navigate = useNavigate();
	const [amount, setAmount] = useState(0);
	const [userData, setUserData] = useState(null);
	const [accountId, setAccountId] = useState(null);


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
			const response = await fetch(`http://localhost:5101/Account/GetByEmail?email=${email}`);
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


	const handleChange = (e) => {
		e.preventDefault();
		const value = Number(e.target.value);
    	setAmount(value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault()	
		const response = await fetch(`http://localhost:5101/Balance/AddBalance`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
			body: JSON.stringify({
				account_id: accountId,
				value: amount,
			}),
		
		})

		if (response.ok) {
			const data = await response.json();
		toast.success("Recarga exitosa!");
			setAmount(0);
		} else {
			toast.error('error en la carga', response);
		}


	}

	const handleback = () => {
		navigate(routes.HOME);
	}

	return (
		<>
		<NavBar />
		<div className="h-screen flex justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
			<SideBar />
				<div className="w-5/6 bg-gray-100 lg:w-full flex flex-col lg:bg-gray-100 relative">
				 <ToastContainer />
					<div className="text-center text-4xl font-bold text-gray-500 pb-10 border-b-2 border-gray-200">
      		    	      <h1>Recargas de Dinero en Cuenta </h1>
      		    	</div>
					<div className=" h-80 flex flex-col items-center mb-6 border rounded-xl border-gray-600 py-4 my-32 mx-5 shadow-lg shadow-gray-700 bg-gradient-to-r from-gray-100 to-gray-300"> 
						<form onSubmit={handleSubmit} className="w-full sm:w-96">
							<div className="flex flex-col lg:flex-row items-center justify-around mx-2">
							<label className="block text-lg font-medium text-gray-700 px-2 py-2 w-48">Ingrese el monto a recargar:</label>
							<input type="text" name="amount" id="amount" className="my-4 p-2" 
							value={amount}
							 onChange={handleChange}
							 />
							</div>
							<div className="flex flex-col lg:flex-row items-center mx-2">
								<button
              					type="submit"
              					className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500  sm:w-ful mx-50 sm:px-20"
            			>	
              					Recargar
           						</button>
								<button
              						type="button"
									onClick={handleback}
              						className="bg-gray-400 text-white m-3 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500  sm:w-ful mx-50 sm:px-20"
            			>		
              						Volver
           						</button>

							</div>
							
						</form>
					</div>
				</div>
		</div>
		</>
	)
}

export default TopUpBalance;
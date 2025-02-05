import React, { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AppTransferContext = createContext();

const AppProvider =({children})=>{

	const [isAmount, setIsAmount] = useState(0);
	const [accountId, setAccountId] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const API_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_LOCAL_API_URL;


		const SendTransfer= async(isAmount,selectedUser,accountId)=>{
			console.log('accountId desde el context',accountId)
			try {

				if (isAmount <= 0) {
					toast.error('El monto debe ser mayor a 0');
					return;
	
				}

				if (!selectedUser) {
					toast.error("Debes seleccionar un usuario");
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
								to_id: selectedUser,
							}),
						
						})
						console.log('datos enviados',response)
						if (response.ok) {
							const data = await response.json();
						toast.success("Tranferencia exitosa!");
           				// Limpia los valores
		   				setIsAmount(0);
		   				setSelectedUser(null);

						} else {
							toast.error('error en la transferencia', response);
						}
				
			} catch (error) {
				console.error(error.message);		
			}					
		}
		const resetIsAmount = () => setIsAmount(0);
	

		return (
			<AppTransferContext.Provider value={{ selectedUser, setSelectedUser,resetIsAmount, isAmount, setIsAmount, accountId, setAccountId, SendTransfer }}>
				{children}
			</AppTransferContext.Provider>
		);
	};
	
export default AppProvider;

export const useAppContext = () => {
    const context = useContext(AppTransferContext);
    if (!context) {
        throw new Error("useAppContext debe usarse dentro de un AppProvider");
    }
    return context;
};
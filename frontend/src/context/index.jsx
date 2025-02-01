import React, { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AppTransferContext = createContext();

const AppProvider =({children})=>{

	const [isAmount, setIsAmount] = useState(0);
		const SendTransfer= async(isAmount,selectedUser)=>{

			try {

				if (isAmount <= 0) {
					toast.error('El monto debe ser mayor a 0');
					return;
	
				}

				if (!selectedUser) {
					toast.error("Debes seleccionar un usuario");
					return;
				  }
			  
					const response = await fetch(`http://localhost:5101/Balance/AddBalance`, {
						method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
							},
							mode: 'cors',
							body: JSON.stringify({
								account_id: selectedUser,
								value: isAmount,
							}),
						
						})
						console.log('datos enviados',response)
						if (response.ok) {
							const data = await response.json();
						toast.success("Tranferencia exitosa!");
						setIsAmount(0);
						selectedUser('');

						} else {
							toast.error('error en la transferencia', response);
						}
				
			} catch (error) {
				console.error(error.message);		
			}					
		}
		const resetIsAmount = () => setIsAmount(0);
	

	return(
		<AppTransferContext.Provider value={{SendTransfer,resetIsAmount,isAmount,}}>
			<ToastContainer/>
			{children}
		</AppTransferContext.Provider>
	)

	
}
export default AppProvider;

export const useAppContext =()=>{
	return useContext(AppTransferContext)
}
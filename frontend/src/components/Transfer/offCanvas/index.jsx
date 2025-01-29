import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const OffCanvas =({isOffCanvas, ClosedOffCanvas })=>{

	const [newUserAccount,setNewUserAccount]=useState('');

	const handleData =(e)=>{
		e.preventDefault();
		const value = Number(e.target.value);
		console.log('tomando los datos',value)
		setNewUserAccount();
	};

	const handleSaveData =()=>{
		console.log('clic')
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
				<div className="flex flex-col justify-center items-center m-12">
					<p>Ingrese el número de CBU:</p>
					<input  
					className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-30"
					type="number"
					id="accountUser"
					name="accountUser"
					value={newUserAccount}
					onChange={handleData}
					/>
				</div>
				<div className="flex flex-col flex-1 justify-center items-center">
					<button type="button"
					 className="bg-blue-600 border rounded-xl p-4 m-4 text-white font-semibold items-end"
					 onClick={handleSaveData}>Guardar</button>
				</div>
        	</div>
			)}					
		</>
	)
}

export default OffCanvas;
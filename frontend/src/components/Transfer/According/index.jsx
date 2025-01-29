import React from "react";
import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const ScheduleUsers =({openIndex})=>{

  const items = [
    { title: "Desde", content: "Contenido de la sección 1." },

  ];	

  return (
	<>
    	 <div
        className={`transition-all duration-300 overflow-hidden ${
			openIndex ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 m-4 rounded-lg shadow-lg justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
		  <div className="mb-4">
            <label className="block text-gray-700">Desde:</label>
            <select className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 px-2">
              <option>Selecciona una cuenta</option>
              <option>Caja de Ahorros:</option>

            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Hacia:</label>
            <select className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 px-2">
              <option>Selecciona un beneficiario</option>
              <option>Pepito</option>
            </select>
          </div>
          <div className="mb-4 relative inline-block">
      		<label className="block text-gray-700 mx-4">Monto:</label>
      		<div className="relative">
      		  <FontAwesomeIcon
      		    icon={faCoins}
      		    style={{
      		      position: 'absolute',
      		      left: '10px',
      		      top: '50%',
      		      transform: 'translateY(-50%)',
      		      color: '#999'
      		    }}
      		  />
      		  <input
      		    type="number"
      		    className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-10"
      		    placeholder=""
      		    style={{ paddingLeft: '30px' }}
      		  />
      		</div>
    	</div>

          <div className="mb-4">
            <label className="block text-gray-700">Concepto:</label>
            <input
              type="text"
              className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-30"
              placeholder="varios"
            />
          </div>  
		  <div className="mb-4">
            <button
              type="button"
              className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 px-2 hover:bg-gray-600 hover:text-white"
             >Enviar</button>
          </div>  
        </div>
      </div>
	</>
  );
}

export default ScheduleUsers;
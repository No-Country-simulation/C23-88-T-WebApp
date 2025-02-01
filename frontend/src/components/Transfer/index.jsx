import React, { useEffect, useState } from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import OffCanvas from "./offCanvas";
import ScheduleUsers from "./According";
import AppProvider from '../../context';

const Transfer =()=>{

	const [isOffCanvas,setIsOffCanvas]=useState(false);
	const [openIndex, setOpenIndex] = useState(null);
	const [stateButton, setStateButton]=useState("");


	const toggleAccordion = (index) => {
		console.log("clic acordeon");
		setOpenIndex(openIndex === index ? null : index);
	  };
	

	const OpenOffCanvas =()=>{
		setIsOffCanvas(true);
	}

	const ClosedOffCanvas =()=>{
		console.log('clic')
		setIsOffCanvas(false);
	}

	const StateSButtonsEnable =()=>{
		OpenOffCanvas();
		setStateButton("btn2");
	}

	return(
		<>
      <NavBar />
      <div className="h-screen flex justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
        <SideBar />
        <div className="w-5/6 bg-gray-100 lg:w-full flex flex-col lg:bg-gray-100 relative">
          <div className="text-center text-4xl font-bold text-gray-500 pb-10 border-b-2 border-gray-200">
            <h1>Transferencias</h1>
          </div>
          <div className="h-80 flex flex-col mb-6 border rounded-2xl border-gray-600 py-4 my-32 mx-5 shadow-lg shadow-gray-700 bg-gradient-to-r from-gray-100 to-gray-300">
            <div className="flex flex-row justify-start items-start px-4 mx-2">
              <button
                className={`h-3/4 w-64 grow-3 border border-gray-500 rounded-2xl p-2 m-4 justify-start ${isOffCanvas ? "bg-gray-300 cursor-not-allowed" : "hover:bg-gray-500 hover:text-white"} sm:ml-3 sm:w-auto ${stateButton === "btn1" ? " bg-gray-500 text-white" : " bg-gray-300"}`}
							 onClick={() => {toggleAccordion(1);setStateButton("btn1");}}
							 disabled={isOffCanvas}
							>
								<h2 className="text-center">
								<FontAwesomeIcon icon={faUsers} className="mx-2"/>
								Beneficiarios Agendados
								</h2>
							</button>
							<button 
							className={`h-3/4 w-64 grow-3 border border-gray-500 rounded-2xl p-2 m-4 justify-start ${openIndex ? "bg-gray-300 cursor-not-allowed" : "hover:bg-gray-500 hover:text-white"} sm:ml-3 sm:w-auto ${stateButton === "btn2" ? " bg-gray-500 text-white" : " bg-gray-300"}`}
							type="button"
							onClick={StateSButtonsEnable}
							disabled={openIndex}
							>
								<h2 className="text-center">
								<FontAwesomeIcon icon={faAddressBook} className="mx-2"/>
								 Agregar Nuevo CBU
								</h2>
							</button>
							<OffCanvas isOffCanvas={isOffCanvas} ClosedOffCanvas={ClosedOffCanvas} />
						</div>
						<div className="flex flex-row">
							<ScheduleUsers openIndex={openIndex} setIsOpen={setOpenIndex} />
						</div>
						
					</div>
				</div>
			</div>
		</>
	)
}

export default Transfer;
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {

	const navigate = useNavigate();

	const Transfer = () => {
		navigate("/balance");
	};

	const MovHistory = () => {
		navigate("/movhistory");
	};
	
	return (
			<>
			<div className="hidden md:block g-white bg-white h-screen w-64 px-4 py-4 border-r-2 border-gray-200">
				<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="relative flex items-center justify-between h-16">
							 <aside>
								<div className="space-y-4">
									<FontAwesomeIcon icon={faMoneyBill} className="mr-2" />	
									<button 
									id="btn-transfer" 
									className=" md:ml-4 text-blue-950 text-lg font-semibold hover:text-gray-500 ml-3"
									onClick={Transfer}>Tranferir
									</button>
									<FontAwesomeIcon icon={faMoneyBill} className="mr-2"/>
									<button id="btn-transferir" 
									className="text-blue-950 text-lg font-semibold hover:text-gray-500  ml-3 sm:ml-4 "
									onClick={MovHistory}>Historial</button>


								</div>
							 </aside>
						</div>
					</div>
			</div>
			</>
		
	);
	

};	

export default SideBar;
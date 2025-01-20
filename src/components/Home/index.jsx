import React from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";

const Home = ()=>{

	return(
		<>
			<NavBar/>
			<div className="flex flex-col sm:flex-row justify-between bg-gray-100">
				<SideBar/>
				<div  className="flex flex-col w-full bg-gray-100 p-4">
					<div className="text-center text-4xl font-bold text-gray-500 pb-10 border-b-2 border-gray-200">
						<h1>Bienvenido</h1> {/* ingresar nombre de l persona */}
					</div>
					<div className="flex flex-col justify-center py-20 ">
						<h3 className="font-mono font-bold">Mi cuenta:</h3>
						<div className="flex flex-row justify-between border-4 rounded-lg shadow-xl bg-white border-gray-200 py-4 px-40 mt-4 mx-40">
							<div>cuenta xxxxx</div>
							<p className="font-bold">Saldo: $200.00</p>{/* ingresar variable que muestra el saldo */}
						</div>
					</div>


				</div>

			</div>

		</>
	)
}

export default Home;
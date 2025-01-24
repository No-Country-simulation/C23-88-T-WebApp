import React from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";

const Home = ()=>{

	return(
		<>
			<NavBar/>
			<div className=" h-screen flex justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
				<SideBar/>
				<div className="w-5/6 bg-gray-100 lg:w-full flex flex-col lg:bg-gray-100">
					<div className="text-center text-4xl font-bold text-gray-500 pb-10 border-b-2 border-gray-200">
						<h1>Bienvenido</h1> {/* ingresar nombre de l persona */}
					</div>
					<div className="flex flex-col justify-center py-10 sm:py-20">
						<h3 className="font-mono font-bold mx-4">Mis Cuentas:</h3>
						<div className="flex flex-row items-center justify-around border-4 rounded-lg shadow-xl bg-white border-gray-200 py-4 px-2 mx-2 mt-4 md:px-32 md:mx-5 md:justify-between">
							<div>Cuenta xxxxx</div>
							<p className="font-bold">Saldo: $200.00</p>{/* ingresar variable que muestra el saldo */}
						</div>
					</div>
				</div>

			</div>

		</>
	)
}

export default Home;
import React, { useState } from "react";
import NavBar from "../Navbar";
import SideBar from "../SideBar";

const MoveHistory =()=>{

	const [history,setHistory]=useState('');
	return (
		<>
		<NavBar/>
		<div className="h-full max-h-full flex justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
			<SideBar/>
			<div className="w-5/6 lg:w-full flex flex-col bg-gray-100">
				<div className="py-4 mx-4 font-semibold">
					<h1>Ultimos Movimientos</h1>
				</div>
				<div className="flex flex-row justify-around font-mono px-32 py-5 text-start bg-gray-500 text-white">
					<p>Cuenta seleccionada:</p>
					<p>xxxxx0654</p>
				</div>
				<div className="w-5/6 lg:w-full flex flex-col md:flex-col justify-around gap-4 my-20">
					<table className="table-auto mx-2 my-8 md:mx-24">
					  <thead>
					    <tr>
					      <th className="text-left px-4 mx-4 border-4 text-lg border-y-gray-500">Fecha</th>
					      <th className="text-left px-4 mx-4 border-4 text-lg border-y-gray-500">Concepto</th>
					      <th className="text-left px-4 mx-4 border-4 text-lg border-y-gray-500">Importe</th>
					    </tr>
					  </thead>
					  <tbody className="grow shrink-0">
					    <tr>
					      <td className="text-left pl-4 mx-4 border-2 border-y-gray-500">31-12-2024</td>
					      <td className="text-left pl-4 mx-4 border-2 border-y-gray-500">Malcolm Lockyer</td>
					      <td className="text-left pl-4 mx-4 border-2 border-y-gray-500">2500,52</td>
					    </tr>
					  </tbody>
					</table>
				</div>
			</div>
		</div>
		</>
	)
}

export default MoveHistory;
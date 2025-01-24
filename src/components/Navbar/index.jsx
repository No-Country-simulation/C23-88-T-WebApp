import React, { useState } from "react";
import logo from '../../assets/logobanco.webp'
import usuario from "../../assets/usuario.png"
import { useNavigate } from "react-router-dom";
import { routess } from "../../utils/routes";

const NavBar =()=>{

	//Menu de usuario
	const [isMenuOpen, setIsMenuOpen]=useState(false);

	const navigate = useNavigate();
	const routes = routess();

	const toggleMenu =()=>{
		setIsMenuOpen((prev) => !prev);
		console.log('clic de abrir',isMenuOpen)
	}

	//cerrar menu

	const handleLogout = () => {
		setIsMenuOpen(false);
		localStorage.removeItem('authToken'),
		navigate(routes.LOGIN)
	  };

	  const Home =()=>{
		navigate(routes.HOME)
		console.log('redirige a home',navigate)
	  }

	  const Move =()=>{
		navigate(routes.LATESTMOVEMENTS)
	  }
	return(
		<>
			<nav className="bg-blue-950">
				<div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
								<span className="absolute -inset-0.5"></span>
								<span className="sr-only">Abrir Menú</span>
								<svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
         						</svg>
								 <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          						</svg>
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex shrink-0 items-center">
								<img src={logo} className="h-8 w-auto" alt="banca digital"/>
							</div>
							<div className="hidden sm:ml-6 sm:block">
								<div className="flex space-x-4">
									<button 
									className="rounded-md bg-blue-950 px-3 py-2 text-sm font-medium text-white"
									onClick={Home}>
										Inicio
									</button>
									<button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
										Transferencias
									</button>
									<button 
									className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
									onClick={Move}>
										Historial
									</button>

								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<button type="button" className="relative rounded-full bg-blue-950 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
									<span className="absolute -inset-1.5"></span>
									<span className="sr-only">Ver notificaciones</span>
									<svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            							<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          							</svg>
								</button>
								<div className="relative ml-3">
									<div>
										<button type="button" 
											className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										 	id="user-menu-button"
											 aria-expanded={isMenuOpen}
										   	aria-haspopup="true"
											onClick={toggleMenu}
										>
											<span className="absolute -inset-1.5"></span>
											<span className="sr-only">Abrir menú de usuario</span>
											<img className="size-8 rounded-full" src={usuario} alt="img de usuario"></img>
										</button>
									</div>
									{isMenuOpen && (
    								<div
      									className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
      									role="menu"
      									aria-orientation="vertical"
      									aria-labelledby="user-menu-button"
      									tabIndex="-1"
    								>
      									<button
      									  className="block px-4 py-2 text-sm text-gray-700"
      									  onClick={handleLogout}
      									>
       										 Salir
      									</button>
    								</div>
  									)}
								</div>
							</div>

						</div>
					</div>
				</div>
			</nav>
		</>	
	)
}


export default NavBar;
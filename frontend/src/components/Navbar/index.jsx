import React, { useState, useEffect } from "react";
import logo from "../../assets/logobanco.webp";
import usuario from "../../assets/usuario.png";
import { useNavigate } from "react-router-dom";
import { routess } from "../../utils/routes";
import { toast } from "react-toastify";

const NavBar = () => {
  //Menu de usuario
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();
  const routes = routess();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    console.log("clic de abrir", isMenuOpen);
  };

  //cerrar menu

  const handleLogout = () => {
    setIsMenuOpen(false);
    localStorage.removeItem("authToken"),
      localStorage.removeItem("credentials");
    navigate(routes.LOGIN);
  };

  const navigateTo = (route) => {
    setIsMobileMenu(false); // Cierra el menú móvil al navegar
    navigate(route);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenu((prev) => !prev);
  };

  const home = () => {
    navigate(routes.HOME);
    
  };

  const move = () => {
    navigate(routes.LATESTMOVEMENTS);
  };

  const topUp = () => {
    navigate(routes.TOPUPBALANCE);
  };
  const transfer = () => {
    navigate(routes.TRANSFER);
  };

  //Modal 

  const openModal =()=>{
    setIsOpen(true)
    console.log(isOpen)

  }

const closedModal =()=>{
  setIsOpen(false);
}


return (
  <nav className="bg-blue-950">
    <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        {/* Botón del menú móvil */}
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenu}
          >
             <span className="absolute -inset-0.5"></span>
            <span className="sr-only">{isMobileMenu ? "Cerrar Menú" : "Abrir Menú"}</span>
            {isMobileMenu ? (
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex shrink-0 items-center">
            <img src={logo} className="h-8 w-auto" alt="banca digital" />
          </div>
        </div>

        {/* Menú principal en escritorio */}
        <div className="hidden sm:block">
          <div className="flex space-x-4">
            <button className="rounded-md bg-blue-950 px-3 py-2 text-sm font-medium text-white" onClick={() => navigateTo(routes.HOME)}>
              Inicio
            </button>
            <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => navigateTo(routes.TRANSFER)}>
              Transferencias
            </button>
            <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => navigateTo(routes.TOPUPBALANCE)}>
              Recargas
            </button>
            <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => navigateTo(routes.LATESTMOVEMENTS)}>
              Historial
            </button>
          </div>
        </div>

        {/* Ícono de usuario */}
        <div className="relative ml-3">
          <button
            type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
            onClick={toggleMenu}
          >
            <span className="sr-only">Abrir menú de usuario</span>
            <img className="size-8 rounded-full" src={usuario} alt="Usuario" />
          </button>

          {/* Menú de usuario */}
          {isMenuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
              <button className="block px-4 py-2 text-sm text-gray-700" onClick={openModal}>
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Menú móvil */}
    {isMobileMenu && (
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <button className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-white bg-blue-950" onClick={home}>
            Inicio
          </button>
          <button className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={transfer}>
            Transferencias
          </button>
          <button className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={topUp}>
            Recargas
          </button>
          <button className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" onClick={move}>
            Historial
          </button>
        </div>
      </div>
    )}

    {/* Modal de cerrar sesión */}
    {isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold text-gray-900">Cerrar sesión</h3>
          <p className="text-sm text-gray-500">¿Estás seguro de que deseas salir?</p>
          <div className="mt-4 flex justify-end">
            <button onClick={closedModal} className="mr-2 px-4 py-2 bg-gray-200 rounded-md">Cancelar</button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md">Salir</button>
          </div>
        </div>
      </div>
    )}
  </nav>
);
};

export default NavBar;
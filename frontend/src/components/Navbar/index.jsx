import React, { useState, useEffect } from "react";
import logo from "../../assets/logobanco.webp";
import usuario from "../../assets/usuario.png";
import { useNavigate } from "react-router-dom";
import { routess } from "../../utils/routes";
import { toast } from "react-toastify";

const NavBar = () => {
  //Menu de usuario
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const Home = () => {
    navigate(routes.HOME);
    
  };

  const Move = () => {
    navigate(routes.LATESTMOVEMENTS);
  };

  const TopUp = () => {
    navigate(routes.TOPUPBALANCE);
  };
  const Transfer = () => {
    navigate(routes.TRANSFER);
  };

  //Modal 

  const OpenModal =()=>{
    setIsOpen(true)
    console.log(isOpen)

  }

const ClosedModal =()=>{
  setIsOpen(false);
}

  return (
    <>
      <nav className="bg-blue-950">
        <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Abrir Menú</span>
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img src={logo} className="h-8 w-auto" alt="banca digital" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <button
                    className="rounded-md bg-blue-950 px-3 py-2 text-sm font-medium text-white"
                    onClick={Home}
                  >
                    Inicio
                  </button>
                  <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={Transfer}>
                    Transferencias
                  </button>
                  <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  onClick={TopUp}>
                    Recargas
                  </button>
                  <button
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={Move}
                  >
                    Historial
                  </button>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-blue-950 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Ver notificaciones</span>
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </button>
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded={isMenuOpen}
                      aria-haspopup="true"
                      onClick={toggleMenu}
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Abrir menú de usuario</span>
                      <img
                        className="size-8 rounded-full"
                        src={usuario}
                        alt="img de usuario"
                      ></img>
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
                        id="openModalButton"
                        onClick={OpenModal}
                      >
                        Salir
                      </button>
                      {isOpen && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                              </div>
                              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-base font-semibold text-gray-900" id="modal-title">Cerrar sesión</h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">¿Estás seguro que deseas salir de la aplicación?</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              onClick={handleLogout}
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                              Cerrar sesión
                            </button>

                            <button
                              onClick={ClosedModal} // Cerrar el modal
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                      )}
                    </div>                   
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

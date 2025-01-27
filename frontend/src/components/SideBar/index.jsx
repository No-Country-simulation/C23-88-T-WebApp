import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { routess } from "../../utils/routes";

const SideBar = () => {
  const navigate = useNavigate();
  const routes = routess();

  const Transfer = () => {
    navigate(routes.TRANSFER);
  };

  const MovHistory = () => {
    navigate(routes.LATESTMOVEMENTS);
  };

  const Reload = () => {
    navigate(routes.RELOAD);
  }

  return (
    <>
      <div
        className="hidden lg:block g-white bg-white h-screen sm:w-64 px-4 py-2 lg:py-4 border-r-2 border-gray-100
			"
      >
        <div className="max-w-7xl mx-4 lg:mx-auto px-2 m sm:px-4 md:px-2 lg:px-4 xl:px-6">
          <div className="relative flex items-center justify-between h-16">
            <aside className="flex flex-row lg:flex-col">
              <div className="space-y-1 lg:space-y-4 lg:justify-between justify-start">
                <FontAwesomeIcon icon={faMoneyBill} className="mr-1" />
                <button
                  id="btn-transfer"
                  className="text-blue-950 text-lg font-semibold hover:text-gray-500 ml-4 md:ml-0"
                  onClick={Transfer}
                >
                  Transferencia
                </button>
                <FontAwesomeIcon icon={faMoneyBill} className="mr-1" />
                <button
                  id="btn-transfer"
                  className="text-blue-950 text-lg font-semibold hover:text-gray-500 ml-6 md:ml-4"
                  onClick={Reload}
                >
                  Recargas
                </button>
                <FontAwesomeIcon icon={faMoneyBill} className="mx-3" />
                <button
                  id="btn-transferir"
                  className="text-blue-950 text-lg font-semibold hover:text-gray-500  ml-4 md:ml-2 "
                  onClick={MovHistory}
                >
                  Historial
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

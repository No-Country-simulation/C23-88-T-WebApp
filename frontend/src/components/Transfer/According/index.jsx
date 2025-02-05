import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../../context";
import{ toast, ToastContainer } from "react-toastify";

const ScheduleUsers = ({ openIndex }) => {
  const [userExist, setUserExist] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [accountId, setAccountId] = useState("");
  const [userData, setUserData] = useState(null);
  const [isAmount,setIsAmount]=useState(0);
  const [errorMessages, setErrorMessages] = useState("");
  const storedCredentials = localStorage.getItem("credentials");
  const {SendTransfer} = useAppContext();
 const API_URL = import.meta.VITE_API_URL;


	const handleinputAmount = (e)=>{
		e.preventDefault();
		const value =e.target.value
		console.log("tomando el monto",value)
		setIsAmount(value);

	}


  useEffect(() => {
    if (storedCredentials) {
      const credentials = JSON.parse(storedCredentials);
      const { email } = credentials;
      getUser(email);
    }
  }, [storedCredentials]);

  const getUser = async (email) => {
    try {
      const response = await fetch(
        `${API_URL}Account/GetByEmail?email=${email}`
      );
      if (!response.ok) {
        throw new Error(
          "Error al obtener los datos del usuario. Cuenta no encontrada."
        );
      }
      const data = await response.json();
      setUserData(data);
      setAccountId(data.account_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const listBeneficiaries = async () => {
    try {
      if (!accountId) return;

      const response = await fetch(
        `${API_URL}/api/Contacts/GetContactList?id=${accountId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Los Beneficiarios registrados: son", data);
        if (data.success) {
          setUserExist(data.data || []);
        } else {
          if (data.error) {
            toast.error(data.error);
          } else if (data.errors) {
            Object.values(data.errors)
              .flat()
              .forEach((err) => {
                toast.error(err);
              });
          } else {
            setErrorMessages(["Ocurrió un error inesperado."]);
          }
        }
      }
    } catch (error) {
      console.log("ocurrio un error al cargar los datos");
      setErrorMessages(["Ocurrió un error al cargar los beneficiarios."]);
    }
  };
  useEffect(() => {
    if (accountId) {
      listBeneficiaries();
      console.log("accountId en el useEffect", accountId);
    }
  }, [accountId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("selectedUser.id:", selectedUser?.id);
console.log("e.target.value:", e.target.value);
console.log("userExist:", userExist);
  
    console.log("selectedUser:", selectedUser);
    if (!selectedUser) {
      toast.error('Debes seleccionar un usuario');
      return;
    }
  
    SendTransfer(isAmount, selectedUser.id, accountId);
  };

  return (
    <>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          openIndex ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
        }`}
      >
        <ToastContainer/>
        <div className="flex flex-col p-4 m-4 rounded-lg shadow-lg justify-around bg-gray-100 sm:flex-row md:justify-between sm:bg-gray-100">
          <div className="mb-4">
            <label className="block text-gray-700">Desde:</label>
            <select
              className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 px-2"
              onChange={(e) => setAccountId(e.target.value)}
              value={accountId}
            >
              <option value={""}>Selecciona una cuenta</option>
              <option value={userData?.account_id}>
                Caja de Ahorros: {userData?.account_id}
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Hacia:</label>
            <select className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 px-2"
           value={selectedUser ? String(selectedUser.id) : ''}
           onChange={(e) => {
            const user = userExist.find(user => String(user.id) === e.target.value);
            if (user) {
              console.log("Usuario seleccionado:", user);
              setSelectedUser(user);
            }
          }}
            disabled={!accountId} >
            <option>Selecciona un beneficiario</option>
              {userExist.length > 0 ? (
                userExist.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.surname}
                  </option>
                ))
              ) : (
                <option>No hay beneficiarios registrados</option>
              )}
            </select>
          </div>
          <div className="mb-4 relative inline-block">
            <label className="block text-gray-700 mx-4">Monto:</label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faCoins}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                }}
              />
              <input
                type="number"
                className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 pl-10"
                placeholder=""
                style={{ paddingLeft: "30px" }}
                value={isAmount}
                onChange={handleinputAmount}
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
              onClick={handleSubmit}
              type="button"
              className="w-full p-2 mr-4 border border-gray-300 rounded mt-1 px-2 hover:bg-gray-600 hover:text-white"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleUsers;

import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const HomeView = () => {
  const { usuario } = useContext(UserContext);

  return (
    <div className="mt-36 flex justify-center">
      {usuario ? (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Usuario logeado</h1>
          <p>Email: {usuario.email}</p>
          <p>UID: {usuario.uid}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-medium">Usuario no logeado</h1>
          <Link to="/login">
            <button className="mt-4 w-[200px] py-1 rounded bg-blue-500 text-white hover:text-yellow-100">
              Logear Usuario
            </button>
          </Link>
          <Link to="/register">
            <button className="mt-4 w-[200px] py-1 rounded bg-blue-500 text-white hover:text-yellow-100">
              Registrar Usuario
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeView;

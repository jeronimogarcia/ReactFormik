import React from "react";
import { Link } from "react-router-dom";
import { SiFirebase } from "react-icons/si";
import { BsCircleFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-20 w-full bg-gray-200 shadow-lg px-20 fixed top-0 text-2xl text-green-600">
      <Link to="/" className="w-52">
        <div className="flex flex-row gap-2">
          <span className="flex items-center ">
            <SiFirebase></SiFirebase>
          </span>
          <span>Firebase/Formik</span>
        </div>
      </Link>
      <ol className="flex flex-row gap-6">
        <li>
          <Link to="/" className="hover:text-red-500">
            Users
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-red-500">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="hover:text-red-500">
            Register
          </Link>
        </li>
      </ol>

      <div className="flex items-center justify-center w-52 gap-4">
        <span>User logged</span>
        <span className="flex items-center blur-[1px]">
          <BsCircleFill />
        </span>
      </div>
    </div>
  );
};

export default Navbar;

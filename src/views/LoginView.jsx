import React, { useContext, useState } from "react";
import { Formik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Spinner from "../components/Spinner/Spinner";
import { UserContext } from "../context/UserContext";

const RegisterView = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [logedEmail, setLogedEmail] = useState(false);

  const auth = getAuth();

  const { usuario, setUsuario } = useContext(UserContext);

  const handleSubmitForm = (e, errors, values, handleSubmit, handleReset) => {
    setWrongPassword(false);
    setLogedEmail(false);
    e.preventDefault();
    handleSubmit();
    if (
      Object.entries(errors).length === 0 &&
      values.email &&
      values.password
    ) {
      logUser(values.email, values.password, handleReset);
    }
  };

  const logUser = (email, password, handleReset) => {
    setIsDisable(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsuario(user);
        console.log(user);
        setLogedEmail(true);
        handleReset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setWrongPassword(true);
      });
    setTimeout(() => {
      setIsDisable(false);
    }, 1000);
  };

  const finalRender = () => {
    if (isDisable) {
      return (
        <div className="mt-2">
          <Spinner />
        </div>
      );
    } else if (wrongPassword) {
      return (
        <div className="text-white mt-2 text-red-500">
          Contraseña errónea o usuario inexistente.
        </div>
      );
    } else if (logedEmail) {
      return (
        <div className="text-white mt-2 text-green-500">
          Usuario logeado con éxito.
        </div>
      );
    } else {
      return <div className="min-h-[24px] min-w-[20px] mt-2"></div>;
    }
  };

  return (
    <div className="mt-36 flex justify-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = (
              <p className="text-white mt-2 text-red-500 absolute top-[141px]">
                Campo requerido.
              </p>
            );
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = (
              <p className="text-white mt-2 text-red-500 absolute top-[141px]">
                Formato email erróneo.
              </p>
            );
          }
          if (!values.password) {
            errors.password = (
              <p className="text-white mt-2 text-red-500 absolute top-[234px]">
                Campo requerido.
              </p>
            );
          } else if (values.password.length < 10) {
            errors.password = (
              <p className="text-white mt-2 text-red-500 absolute top-[234px]">
                Debe contener al menos 10 caracteres.
              </p>
            );
          } else if (values.password.length > 25) {
            errors.password = (
              <p className="text-white mt-2 text-red-500 absolute top-[234px]">
                Debe contener como máximo 25 caracteres.
              </p>
            );
          }

          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          handleReset,
        }) => (
          <form
            onSubmit={(e) =>
              handleSubmitForm(e, errors, values, handleSubmit, handleReset)
            }
            className="flex align-center flex-col w-[600px] p-8 pb-8 rounded bg-[#2b343b] relative"
          >
            <h1 className="text-2xl text-white">Log In Form</h1>
            <span className="text-lg mt-6 mb-2 text-white">Email</span>
            <input
              className="border border-gray-500 px-1 rounded outline-none"
              type="name"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email}
            <span className="text-lg mt-8 mb-2 text-white">Password</span>
            <input
              className="border border-gray-500 px-1 rounded outline-none"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <div className="flex flex-col justify-center items-center relative">
              <button
                type="submit"
                disabled={isDisable || usuario}
                className={`mt-12 w-[60%] py-1 rounded bg-blue-500 text-white hover:text-yellow-100 ${
                  isDisable || usuario ? "opacity-50" : "opacity-100"
                }`}
              >
                Logear Usuario
              </button>

              {finalRender()}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterView;

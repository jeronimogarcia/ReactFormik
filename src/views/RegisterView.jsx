import React, { useState } from "react";
import { Formik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Spinner from "../components/Spinner/Spinner";

const RegisterView = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [usedEmail, setUsedEmail] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(false);

  const auth = getAuth();

  const handleSubmitForm = (e, errors, values, handleSubmit, handleReset) => {
    setUsedEmail(false);
    setRegisteredEmail(false);
    e.preventDefault();
    handleSubmit();
    if (
      Object.entries(errors).length === 0 &&
      values.email &&
      values.password &&
      values.repeatPassword
    ) {
      registerUser(values.email, values.password, handleReset);
    }
  };

  const registerUser = (email, password, handleReset) => {
    setIsDisable(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setRegisteredEmail(true);
        handleReset();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setUsedEmail(true);
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
    } else if (usedEmail) {
      return (
        <div className="text-white mt-2 text-red-500">
          Email en uso. Utilice otro.
        </div>
      );
    } else if (registeredEmail) {
      return (
        <div className="text-white mt-2 text-green-500">
          Usuario registrado con exito.
        </div>
      );
    } else {
      return <div className="min-h-[24px] min-w-[20px] mt-2"></div>;
    }
  };

  return (
    <div className="mt-36 flex justify-center">
      <Formik
        initialValues={{ email: "", password: "", repeatPassword: "" }}
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
          if (!values.repeatPassword) {
            errors.repeatPassword = (
              <p className="text-white mt-2 text-red-500 absolute top-[328px]">
                Campo requerido.
              </p>
            );
          } else if (values.password !== values.repeatPassword) {
            errors.repeatPassword = (
              <p className="text-white mt-2 text-red-500 absolute top-[328px]">
                Las contraseñas deben coincidir.
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
            <h1 className="text-2xl text-white">Register Form</h1>
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
            <span className="text-lg mt-8 mb-2 text-white">
              Repetir Password
            </span>
            <input
              className="border border-gray-500 px-1 rounded outline-none"
              type="password"
              name="repeatPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repeatPassword}
            />
            {errors.repeatPassword &&
              touched.repeatPassword &&
              errors.repeatPassword}
            <div className="flex flex-col justify-center items-center relative">
              <button
                type="submit"
                disabled={isDisable}
                className={`mt-12 w-[60%] py-1 rounded bg-blue-500 text-white hover:text-yellow-100 ${
                  isDisable ? "opacity-50" : "opacity-100"
                }`}
              >
                Registrar Usuario
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

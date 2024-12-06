import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import useForm from "../hooks/useForm";
import loginValidation from "../utils/loginValidation";

const LoginComponent = () => {
   const { values, handleChange } = useForm({email: "", password: "", remember_me: false });
   const [errorValidation, setErrorValidation] = useState({})
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { loading, error } = useSelector((state) => state.auth);
   const [showError, setShowError] = useState(false);
   
   useEffect(() => {
     const token = localStorage.getItem("token");
     if (token) {
       navigate("/dashboard");
     }
   }, [navigate]);

   useEffect(() => {
    if (showError) {
      const validationErrors = loginValidation(values);
      setErrorValidation(validationErrors);
    }
    }, [values]);

    const handleFormChange = (e) => {
      handleChange(e);
      setShowError(true);
    }
 
   const handleLogin = (e) => {
     e.preventDefault();

     if (Object.keys(errorValidation).length > 0) {
       return;
     }

     dispatch(login(values)).then((res) => {
       if (res.meta.requestStatus === "fulfilled") {
         navigate("/dashboard");
       }
     });
   };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        {error && <p className="text-sm text-red-500 mt-3 text-center">{error === "Invalid credentials" ? "Invalid password" : error}</p>}
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={values.email}
              onChange={handleFormChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary ${loading ? "cursor-wait bg-gray-200" : ""}`}
              disabled={loading}
            />
            {errorValidation?.email && <p className="text-sm text-red-500 mt-3">{errorValidation.email}</p>}
          </div>
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={values.password}
              onChange={handleFormChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary ${loading ? "cursor-wait bg-gray-200" : ""}`}
              disabled={loading}
            />
            {errorValidation.password && <p className="text-sm text-red-500 mt-3">{errorValidation.password}</p>}
          </div>
          <div className="flex items-center justify-start">
            <input id="rememberMe" name="remember_me" type="checkbox" checked={values.remember_me} onChange={handleFormChange} />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Remember me</label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-3 text-xl font-semibold text-white bg-primary rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-blue-200 ${loading ? "cursor-wait bg-yellow-600" : ""}`}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginComponent;

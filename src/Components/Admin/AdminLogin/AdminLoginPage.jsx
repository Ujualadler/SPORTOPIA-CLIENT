import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminAxios from "../../../Axios/adminAxios";
import { AdminLogin } from "../../../Redux/Slices/adminAuth.jsx";
import { Toaster, toast } from "react-hot-toast";

function AdminLoginPage() {
  const adminAxios=AdminAxios()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateError = (err) => toast.error(err);

  const adminFormSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      generateError("Please fill in all the fields");
      return;
    }
    adminAxios.post("/login", { email, password }).then((response) => {
      const result = response.data.result;
      if (result.Status) {
        const token = result.token;
        console.log(token);
        dispatch(AdminLogin({ token: token }));
        navigate("/admin/home");
      } else {
        generateError(result.message);
      }
    });
  };
  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-500 ">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            ADMIN LOGIN
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={adminFormSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLoginPage;

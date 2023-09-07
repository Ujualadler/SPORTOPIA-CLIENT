import { Link, useNavigate } from "react-router-dom";
import TurfAxios from "../../../Axios/turfAxios";
import { Toaster, toast } from "react-hot-toast";
import { TurfLogin } from "../../../Redux/Slices/turfAuth";
import { useState, react } from "react";
import { useDispatch } from "react-redux";
import TurfGoogle from "./TurfGoogleLogin";

export default function TurfLoginPage() {

  const turfAxios=TurfAxios()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateError = (err) => {
    toast.error(err, { position: "bottom-center" });
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() && !password.trim()) {
      generateError("Please fill in all the fields");
      return;
    }
    if (!email.trim()) {
      generateError("Please fill the Email field");
      return;
    }
    if (!password.trim()) {
      generateError("Please fill the Password field");
      return;
    }

    try {
      const response = await turfAxios.post("/login", { email, password });
      console.log(response);
      console.log(response.data);
      const result = response.data.turfSignUp;
      console.log(result);
      if (result.Status === true) {
        const token = result.token;
        dispatch(TurfLogin({ token: token }));
        navigate("/turf");
      } else {
        generateError(result.message);
      }
    } catch (error) {
      generateError("An error occurred. Please try again.");
      console.error(error);
      navigate('/turf/error')
    }
  };

  return (
    <>
      <div className="flex h-screen  flex-1 bg-black flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster position="bottom-center" reverseOrder={false} />
        <div className="bg-white md:m-96 rounded-lg space-y-9 border border-gray-900 " >
          <div className="bg-white m-5 rounded-2xl ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto mt-2"
            src="/UserImages/sportopianextlogo.jpg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            TURF ADMIN LOGIN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={LoginSubmit}
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
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          <TurfGoogle/>
                
          <p className="mt-2 text-center text-sm text-gray-500">
            Otp login?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              <Link to="/turf/otpLogin">Click here</Link>
            </a>
          </p>  
          <p className="mt-1 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              <Link to="/turf/signup">Register here</Link>
            </a>
          </p>
        </div>
        </div>
      </div>
      </div>
    </>
  );
}

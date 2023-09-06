import { Link, useNavigate } from "react-router-dom";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { GetUserData, UserLogin } from "../../../Redux/Slices/userAuth";
import { useState, react } from "react";
import { useDispatch } from "react-redux";
import Google from "./Google";

export default function Login() {
  const userAxios = UserAxios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgott, setForgott] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateError = (err) => {
    toast.error(err);
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
      const response = await userAxios.post("/login", { email, password });
      const result = response.data.userSignUp;
      const userDetails = response.data.userData;

      if (result.Status === true) {
        const token = result.token;
        const UserData = userDetails;
        console.log(UserData)
        dispatch(UserLogin({ token: token }));
        dispatch(GetUserData({ userData: UserData }));
        navigate("/");
      } else {
        generateError(result.message);
      }
    } catch (error) {
      navigate('/error')
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-black h-screen md:h-full ">
        <div className=" md:py-8">
          <form className="" onSubmit={LoginSubmit}>
            <div className="flex md:bg-none  md:bg-opacity-25 bg-cover bg-center bg-[url('https://wallpaperaccess.com/full/1768022.jpg')] md:border border-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div
                className="hidden md:block lg:w-1/2 bg-cover"
                style={{
                  backgroundImage:
                    "url(https://wallpaperaccess.com/full/1767907.jpg)",
                }}
              ></div>
              <div className="w-full p-8 lg:w-1/2">
                <h2 className="text-2xl font-semibold flex justify-center items-center  text-gray-700 text-center">
                  <img
                    className="w-24"
                    src="/UserImages/sportopianextlogo.jpg"
                    alt=""
                  />
                </h2>
                <p className="text-xl text-gray-100 text-center">
                  Welcome back!
                </p>
                <div className="mb-5 flex justify-center items-center">
                  <Google />
                </div>
              
                <div className="mt-4">
                  <label className="block text-gray-200 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="email"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label className="block text-gray-200 text-sm font-bold mb-2">
                      Password
                    </label>
                  </div>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                    type="password"
                  />
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-black text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  >
                    Login
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 lg:w-1/4"></span>
                  <a className="text-xs text-center text-red-700 uppercase">
                    {" "}
                    <Link to="/otpLogin">OTP LOGIN</Link>
                  </a>
                  <span className="border-b w-1/5 lg:w-1/4"></span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 md:w-1/4"></span>
                  <a href="#" className="text-xs text-gray-500 uppercase">
                    <Link to="/signup">REGISTER HERE</Link>
                  </a>
                  <span className="border-b w-1/5 md:w-1/4"></span>
                </div>
                <div className='flex justify-center'>
              <p className="no-underline border-b mt-1 text-xs text-blue-700 border-blue text-blue cursor-pointer" onClick={() => navigate('/forgotPassword')}>
                FORGOT PASSWORD?
              </p>.
            </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

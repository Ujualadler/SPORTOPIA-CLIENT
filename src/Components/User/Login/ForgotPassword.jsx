import { Link, useNavigate } from "react-router-dom";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useState, react } from "react";

export default function ForgotPassword() {
  const userAxios = UserAxios();
  const [email, setEmail] = useState("");
  const navigate=useNavigate()

  const forgotPassword = () => {
    event.preventDefault()
    if(email.trim().length==0){
      toast.error('Enter email')
    }else{
      userAxios.post('/forgotPassword', { email }).then((res) => {
        if(res.data.message===true){
        toast.success('Check your email for resetting password')
        navigate('/login')
        }
      }).catch((error) => {
        if (error.response.data.errMsg) {
          toast.error(error.response.data.errMsg)
          navigate('/error')
        }
      })
    }
  }

  return (
    <>
      <div className="bg-black h-screen ">
        <div className="py-36 ">
          <form className="" onSubmit={forgotPassword}>
            <div className="flex md:bg-none  md:bg-opacity-25 bg-cover bg-center bg-[url('https://wallpaperaccess.com/full/1436809.jpg')] md:border border-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
              <div
                className="hidden md:block lg:w-1/2 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://wallpaperaccess.com/full/1436809.jpg)",
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
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-black text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                  >
                    SUBMIT
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="border-b w-1/5 md:w-1/4"></span>
                  <a href="#" className="text-xs text-gray-500 uppercase">
                    <Link to="/login">Login here</Link>
                  </a>
                  <span className="border-b w-1/5 md:w-1/4"></span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

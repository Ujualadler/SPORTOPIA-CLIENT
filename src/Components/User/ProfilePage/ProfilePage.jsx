import React, { useEffect, useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const userAxios = UserAxios();

  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});
  let token = useSelector((state) => state.User.Token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    userAxios
      .get("/profile")
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      });
  }, []);

  return (
    <div className="p-2 mt-3">
      <div className="space-x-8 flex  justify-center mt-4  "></div>
      <div className="p-8 warm-gray-800 shadow mt-24 border border-black bg-cover bg-center ">
        <div className="grid grid-cols-1 md:grid-cols-1">
          <div className="relative">
            <div className="w-48 h-48  mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-32  flex items-center justify-center text-indigo-500">
              <div className="w-48 h-24 overflow-hidden  mx-auto shadow-2xl absolute inset-x-0 bottom-0 -mt-32  flex items-center justify-center text-indigo-500 z-0 bg-none ">
                <div className="w-48 h-48 bg-gray-900 absolute inset-x-0 bottom-0 rounded-full"></div>
              </div>
              <img
                className="w-44 h-44 rounded-full relative "
                src={UserData.image? UserData.image : "https://as1.ftcdn.net/v2/jpg/02/09/95/42/1000_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.jpg"}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="mt-20 font-semibold text-center pb-12 ">
          <h1 className="text-4xl font-medium text-white">
            {UserData ? UserData.name : ""}
          </h1>
          <p className="mt-8 text-white">
            CONTACT NUMBER -{UserData ? UserData.contactNumber : ""}
          </p>
          <p className="mt-2 font-semibold t text-white">
            EMAIL:{UserData ? UserData.email : ""}
          </p>
          <p className="mt-2 font-semibold text-white">
            AGE:{UserData ? UserData.age : ""}
          </p>
          <p className="mt-2 font-semibold text-white">
            STREET:{UserData ? UserData.street : ""}
          </p>
          <p className="mt-2 font-semibold text-white">
            CITY:{UserData ? UserData.city : ""}
          </p>
          <p className="mt-2 font-semibold text-white">
            STATE:{UserData ? UserData.state : ""}
          </p>
          <p className="mt-2 font-semibold text-white">
            PIN CODE:{UserData ? UserData.pin : ""}
          </p>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-white text-center font-light lg:px-16"></p>
          <button className="text-white bg-black p-2 hover:bg-white hover:text-black  px-4 font-medium ">
            <Link to="/editProfile">ADD MORE DETAILS</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

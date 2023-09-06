import React from "react";
import { useDispatch } from "react-redux";
import { AdminLogout } from "../../../Redux/Slices/adminAuth";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartSimple,
  faFutbol,
  faImage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function AdminNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exit = () => {
    dispatch(AdminLogout());
    navigate("/admin");
  };

  const turfget = () => {
    navigate("/admin/viewTurf");
  };

  const userget = () => {
    navigate("/admin/viewUser");
  };

  const bannerget = () => {
    navigate("/admin/banner");
  };

  const dashboard = () => {
    navigate("/admin/home");
  };

  return (
    <div className="w-1/6 h-screen bg-gray-950 text-white flex flex-col items-center space-y-11">
      <img src="" className="pt-10 md:pt-32 w-12" alt="" />
      <div className="flex items-center" onClick={dashboard}>
        <FontAwesomeIcon className="h-6 mr-2" icon={faChartSimple} />
        <div className="font-bold hidden md:block ">DASHBOARD</div>
      </div>
      <div className="flex items-center" onClick={turfget}>
        <FontAwesomeIcon className="h-6 mr-2" icon={faFutbol} />
        <div className="font-bold hidden md:block ">TURFLIST</div>
      </div>
      <div className="flex items-center" onClick={userget}>
        <FontAwesomeIcon className="h-6 mr-2" icon={faUser} />
        <div className="font-bold hidden md:block">USERLIST</div>
      </div>
      <div className="cursor-pointer flex items-center" onClick={bannerget}>
        <FontAwesomeIcon className="h-6 mr-2" icon={faImage} />
        <div className="font-bold hidden md:block">BANNER</div>
      </div>
      <div className="flex-grow"></div>
      <div onClick={exit} className="mt-auto flex items-center">
        <FontAwesomeIcon className="h-6 mr-2" icon={faArrowRightFromBracket} />
        <div onClick={exit} className="mt-6  mb-6 hidden md:block font-bold">
          Logout
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;

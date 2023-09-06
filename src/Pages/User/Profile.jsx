import React from "react";
import TurfNavbar from "../../Components/TurfAdmin/TurfNavbar/TurfNavbar";
import ProfilePage from "../../Components/User/ProfilePage/ProfilePage";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ProfilePage />
      </div>
    </>
  );
}

export default Profile;

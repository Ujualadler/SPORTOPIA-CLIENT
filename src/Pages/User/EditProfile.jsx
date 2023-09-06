import React from "react";
import ProfileEdit from "../../Components/User/ProfileEdit/ProfileEdit";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";

function EditProfile() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ProfileEdit />
      </div>
    </>
  );
}

export default EditProfile;

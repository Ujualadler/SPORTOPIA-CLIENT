import React from "react";
import TurfNavbar from "../../Components/TurfAdmin/TurfNavbar/TurfNavbar";
import ProfilePage from "../../Components/User/ProfilePage/ProfilePage";
import TurfAdminProfile from "../../Components/TurfAdmin/TurfAdminProfile/TurfAdminProfile";

function TurfAdminProfilePage() {
  return (
    <>
      <TurfNavbar />
      <div className="m-1   bg-cover bg-center bg-[url('https://media.istockphoto.com/id/1287665860/vector/modern-3d-black-abstract-tech-background.jpg?s=612x612&w=0&k=20&c=jfj-7hsWU-jId-AblmySe1N47BxamdwPUEssBAULaL8=')]">
        <TurfAdminProfile />
      </div>
    </>
  );
}

export default TurfAdminProfilePage;
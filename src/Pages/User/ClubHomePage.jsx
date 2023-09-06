import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import ClubNavbar from "../../Components/User/ClubNavbar/ClubNavbar";
import ClubHome from "../../Components/User/ClubHome/ClubHome";
import Footer from "../../Components/User/Footer/Footer";

function ClubHomePage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubNavbar />
        <ClubHome />
      </div>
      <Footer />
    </>
  );
}

export default ClubHomePage;

import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import ClubNavbar from "../../Components/User/ClubNavbar/ClubNavbar";
import ClubUserHome from "../../Components/User/ClubUserHome/ClubUserHome";
import Footer from "../../Components/User/Footer/Footer";
import ClubUserNavbar from "../../Components/User/ClubUserNavbar/ClubUserNavbar";

function ClubUserHomePage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubUserNavbar />
        <ClubUserHome />
      </div>
      <Footer />
    </>
  );
}

export default ClubUserHomePage;

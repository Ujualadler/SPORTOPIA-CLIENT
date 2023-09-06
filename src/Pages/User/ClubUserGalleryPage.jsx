import React from "react";
import ClubUserNavbar from "../../Components/User/ClubUserNavbar/ClubUserNavbar";
import ClubUserGallery from "../../Components/User/ClubUserGallery/ClubUserGallery";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import Footer from "../../Components/User/Footer/Footer";

function ClubUserGalleryPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubUserNavbar />
        <ClubUserGallery />
      </div>
      <Footer />
    </>
  );
}

export default ClubUserGalleryPage;

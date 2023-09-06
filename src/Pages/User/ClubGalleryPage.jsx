import React from "react";
import ClubNavbar from "../../Components/User/ClubNavbar/ClubNavbar";
import ClubGallery from "../../Components/User/Clubgallery/ClubGallery";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";

function ClubGalleryPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubNavbar />
        <ClubGallery />
      </div>
    </>
  );
}

export default ClubGalleryPage;

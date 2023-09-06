import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import CreatedClubs from "../../Components/User/CreatedClub/CreatedClub";
import Footer from "../../Components/User/Footer/Footer";

function CreatedClubsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <CreatedClubs />
      </div>
      <Footer />
    </>
  );
}

export default CreatedClubsPage;

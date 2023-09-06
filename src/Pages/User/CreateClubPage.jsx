import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import ClubCreation from "../../Components/User/ClubCreation/ClubCreation";
import Footer from "../../Components/User/Footer/Footer";

function CreateClubPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubCreation />
      </div>
      <Footer />
    </>
  );
}

export default CreateClubPage;

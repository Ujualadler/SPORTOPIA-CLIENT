import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import YourClubs from "../../Components/User/YourClubs/YourClubs";
import Footer from "../../Components/User/Footer/Footer";

function YourClubsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <YourClubs />
      </div>
      <Footer />
    </>
  );
}

export default YourClubsPage;

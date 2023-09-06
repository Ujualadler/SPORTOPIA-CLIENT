import React from "react";
import Booking from "../../Components/User/Booking/Booking";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import Footer from "../../Components/User/Footer/Footer";

function GetTurfs() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <Booking />
      </div>
      <Footer />
    </>
  );
}

export default GetTurfs;

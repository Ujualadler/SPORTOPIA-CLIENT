import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import TurfBooking from "../../Components/User/TurfBooking/TurfBooking";
import Footer from "../../Components/User/Footer/Footer";

function TurfBookingPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <TurfBooking />
      </div>
      <Footer />
    </>
  );
}

export default TurfBookingPage;

import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import Bookinghistory from "../../Components/User/BookingHistory/BookingHistory";
import Footer from "../../Components/User/Footer/Footer";

function BookingHistoryPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <Bookinghistory />
      </div>
      <Footer />
    </>
  );
}

export default BookingHistoryPage;

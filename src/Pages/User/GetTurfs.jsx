import React from "react";
import Booking from "../../Components/User/Booking/Booking";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import Footer from "../../Components/User/Footer/Footer";

function GetTurfs() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-opacity-90 bg-gray-800 bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdqy8XnHVMpJGZiYBnzoFO0cYJjgAu7ndi4Q&usqp=CAU)]">
        <Booking />
      </div>
      <Footer />
    </>
  );
}

export default GetTurfs;

import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import ClubList from "../../Components/User/ClubList/ClubList";
import Footer from "../../Components/User/Footer/Footer";

function ClubListPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubList />
      </div>
      <Footer />
    </>
  );
}

export default ClubListPage;

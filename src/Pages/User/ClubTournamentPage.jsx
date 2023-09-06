import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import ClubTournament from "../../Components/User/ClubTournament/ClubTournament";
import ClubNavbar from "../../Components/User/ClubNavbar/ClubNavbar";
import Footer from "../../Components/User/Footer/Footer";

function ClubTournamentPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubNavbar />
        <ClubTournament />
      </div>
      <Footer />
    </>
  );
}

export default ClubTournamentPage;

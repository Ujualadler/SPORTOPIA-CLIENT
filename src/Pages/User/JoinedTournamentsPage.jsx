import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import JoinedTournaments from "../../Components/User/JoinedTournaments/JoinedTournaments";
import ClubNavbar from "../../Components/User/ClubNavbar/ClubNavbar";

function JoinedTournamentsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubNavbar />
        <JoinedTournaments />
      </div>
    </>
  );
}

export default JoinedTournamentsPage;

import React from "react";
import YourTournaments from "../../Components/User/YourTournaments/YourTournaments";
import ClubNavbar from "../../Components/User/ClubNavbar/ClubNavbar";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import ClubUserNavbar from "../../Components/User/ClubUserNavbar/ClubUserNavbar";
import { useParams } from "react-router-dom";

function YourTournamentsPage() {
  const { role } = useParams();

  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        {role === "member" ? <ClubUserNavbar /> : <ClubNavbar />}
        <YourTournaments />
      </div>
    </>
  );
}

export default YourTournamentsPage;

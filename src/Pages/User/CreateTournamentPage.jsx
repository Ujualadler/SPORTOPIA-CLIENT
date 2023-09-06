import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import CreateTournament from "../../Components/User/CreateTournament/CreateTournament";

function CreateTournamentPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <CreateTournament />
      </div>
    </>
  );
}

export default CreateTournamentPage;

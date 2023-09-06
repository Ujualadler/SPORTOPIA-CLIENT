import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import EditTournament from "../../Components/User/EditTournament/EditTournament";
import Footer from "../../Components/User/Footer/Footer";

function EditTournamentPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <EditTournament />
      </div>
      <Footer />
    </>
  );
}

export default EditTournamentPage;

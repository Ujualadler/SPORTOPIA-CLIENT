import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import ClubNavbar from "../../Components/User/ClubNavbar/ClubNavbar";
import Footer from "../../Components/User/Footer/Footer";
import ClubMembers from "../../Components/User/ClubMembers/ClubMembers";

function ClubMembersPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4  m-1 pb-4 bg-cover bg-center min-h-screen bg-gray-800">
        <ClubNavbar />
        <ClubMembers />
      </div>
      <Footer />
    </>
  );
}

export default ClubMembersPage;

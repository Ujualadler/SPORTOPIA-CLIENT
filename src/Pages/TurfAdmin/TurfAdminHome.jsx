import React from "react";
import TurfNavbar from "../../Components/TurfAdmin/TurfNavbar/TurfNavbar";
import TurfHome from "../../Components/TurfAdmin/TurfHome/TurfHome";
import Footer from "../../Components/User/Footer/Footer";

function TurfAdminHome() {
  return (
    <>
      <TurfNavbar />
      <TurfHome />
      <Footer/>
    </>
  );
}

export default TurfAdminHome;

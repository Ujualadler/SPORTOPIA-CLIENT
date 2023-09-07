import React from "react";
import TurfNavbar from "../../Components/TurfAdmin/TurfNavbar/TurfNavbar";
import TurfListing from "../../Components/TurfAdmin/TurfListing/TurfListing";
import Footer from "../../Components/User/Footer/Footer";

function TurfsListing() {
  return (
    <>
      <TurfNavbar />
      <div className="pt-4  m-1 pb-4 min-h-screen bg-cover bg-center bg-[url('https://media.istockphoto.com/id/1287665860/vector/modern-3d-black-abstract-tech-background.jpg?s=612x612&w=0&k=20&c=jfj-7hsWU-jId-AblmySe1N47BxamdwPUEssBAULaL8=')]">
        <div className="flex md:justify-start justify-center">
          <div className="md:ml-12 mt-7 text-white  text-xl font-bold trackinge-wide">
            REGISTERED TURFS
          </div>
        </div>
        <TurfListing />
      </div>
      <Footer />
    </>
  );
}

export default TurfsListing;

import React from "react";
import TurfNavbar from "../../Components/TurfAdmin/TurfNavbar/TurfNavbar";
import TurfBookhistory from "../../Components/TurfAdmin/TurfBookHistory/TurfBookHistory";

function TurfBookHistoryPage() {
  return (
    <>
      <TurfNavbar />
      <div className="m-1  bg-cover min-h-screen text-white bg-center bg-[url(https://media.istockphoto.com/id/1468296537/vector/seamless-camouflaged-black-grunge-textures-wallpaper-background.jpg?s=612x612&w=0&k=20&c=Sc3auzDoYX7wt01KphLYfWqIvtRpyzfjvAB6PPZRK0U=)]">
        <TurfBookhistory />
      </div>
    </>
  );
}

export default TurfBookHistoryPage;

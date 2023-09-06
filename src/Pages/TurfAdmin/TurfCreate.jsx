import React from "react";
import TurfNavbar from "../../Components/TurfAdmin/TurfNavbar/TurfNavbar";
import TurfRegistration from "../../Components/TurfAdmin/TurfRegistration/TurfRegistration";

function TurfCreate() {
  return (
    <>
      <TurfNavbar />
      <div className=" m-1  bg-cover text-white bg-center bg-[url(https://media.istockphoto.com/id/1468296537/vector/seamless-camouflaged-black-grunge-textures-wallpaper-background.jpg?s=612x612&w=0&k=20&c=Sc3auzDoYX7wt01KphLYfWqIvtRpyzfjvAB6PPZRK0U=)]">
        <TurfRegistration />
      </div>
    </>
  );
}

export default TurfCreate;

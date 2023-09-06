import React from "react";
import { useNavigate } from "react-router-dom";

function ClubUserNavbar() {
    const navigate=useNavigate()

    const chatNavigate=(role)=>{
      navigate(`/chat/${role}`)
    }

    const tournaments=(role)=>{
      navigate(`/yourTournaments/${role}`)
    }
  return (
    <>
      <div className="flex justify-center bg-black m-2">
        <div className="flex md:w-3/4 w-full bg-black ml-1 mr-1  md:m-2 md:p-2  md:font-bold md:text-lg">
          <div onClick={()=>tournaments('member')} className="bg-black relative w-full md:w-auto md:flex-1 flex items-center justify-center h-48 md:h-56 font-heading text-white uppercase md:tracking-widest hover:opacity-75">
            <div className="absolute z-10">Tournaments</div>
            <img
              src="https://media.istockphoto.com/id/1311507286/vector/speed-line-motion-vector-background-dynamic-blue-neon-sport-texture-technology-stream-design.jpg?s=612x612&w=0&k=20&c=ZtaqYKRjyXYcMMtPyHctPIWqaIUF0xhVJdZXnug-Ymc="
              className=" inset-0 w-32 h-32  md:w-48 md:h-48 object-cover opacity-70"
            />{" "}
          </div >
          <div onClick={()=>chatNavigate('member')}  className="bg-black relative w-full md:w-auto md:flex-1 flex items-center justify-center h-48 md:h-56 font-heading text-white uppercase md:tracking-widest hover:opacity-75">
            <div className="absolute z-10">CHAT</div>
            <img
              src="https://media.istockphoto.com/id/1311507286/vector/speed-line-motion-vector-background-dynamic-blue-neon-sport-texture-technology-stream-design.jpg?s=612x612&w=0&k=20&c=ZtaqYKRjyXYcMMtPyHctPIWqaIUF0xhVJdZXnug-Ymc="
              className=" inset-0 w-32 h-32 md:w-48 md:h-48 object-cover opacity-70"
            />{" "}
          </div>
          <div onClick={()=>navigate('/clubUserGallery')}  className="bg-black relative w-full md:w-auto md:flex-1 flex items-center justify-center h-48 md:h-56 font-heading text-white uppercase md:tracking-widest hover:opacity-75">
            <div className="absolute z-10">GALLERY</div>
            <img
              src="https://media.istockphoto.com/id/1311507286/vector/speed-line-motion-vector-background-dynamic-blue-neon-sport-texture-technology-stream-design.jpg?s=612x612&w=0&k=20&c=ZtaqYKRjyXYcMMtPyHctPIWqaIUF0xhVJdZXnug-Ymc="
              className=" inset-0 w-32 h-32 md:w-48 md:h-48 object-cover opacity-70"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubUserNavbar;

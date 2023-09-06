import React, { useEffect, useState } from "react";
import Cards from "../../Utilities/Cards";
import Adminaxios from "../../../Axios/adminAxios";


function AdminHome() {
  const adminAxios=Adminaxios()
  const [details, setDetails] = useState({});

  useEffect(() => {
    adminAxios.get("/allDetails")
      .then((response) => {
        console.log(response.data);
        setDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let users = {
    image: "/UserImages/banner2.avif",
    title: "TOTAL USERS REGISTERED",
    numbers:details?.userCount
  };

  let turfs = {
    image: "/UserImages/banner2.avif",
    title: "TOTAL TURVES REGISTERED",
    numbers: details?.turfCount
  };

  let clubs = {
    image: "/UserImages/banner2.avif",
    title: "TOTAL CLUBS REGISTERED",
    numbers: details?.clubCount
  };

  let tournaments = {
    image: "/UserImages/banner2.avif",
    title: "TOTAL TOURNAMENTS CONDUCTED",
    numbers: details?.tournamentCount,
  };
  return (
    <div className="bg-gray-900 w-full h-screen overflow-y-auto">
      <div className="bg-gray-900 flex w-full justify-center">
        <div className="mt-5 font-bold text-white text-xl ">
          WELCOME ADMIN
        </div>
      </div>
      <div className="flex justify-center items-center ">
      <div className="grid grid-cols-12 m-2  ">
        <div className="md:col-span-6 col-span-12  p-1">
        <Cards reg={users} />
        </div>
        <div className="md:col-span-6 col-span-12  p-1">
        <Cards reg={clubs} />
        </div>
        <div className="md:col-span-6 col-span-12  p-1">
        <Cards reg={turfs} />
        </div> 
        <div className="md:col-span-6 col-span-12  p-1">
        <Cards reg={tournaments} />
        </div>
      </div>
      </div>
 
    </div>
  );
}

export default AdminHome;

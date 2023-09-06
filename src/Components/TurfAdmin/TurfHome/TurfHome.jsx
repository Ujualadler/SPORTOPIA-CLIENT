import React, { useEffect, useState } from "react";
import Carousal from "../../Utilities/Carousal";
import Cards from "../../Utilities/Cards";
import { Link } from "react-router-dom";
import AdminAxios from "../../../Axios/adminAxios";


function TurfHome() {
  const [banner, setBanner] = useState("");
  const adminAxios = AdminAxios();

  useEffect(() => {
    try {
      const getBanner = async () => {
        const response = await adminAxios.get("/getBanner");
        if (response) {
          setBanner(response.data.banner);
        }
      };
      getBanner();
    } catch (error) {
      console.log(error);
      navigate('/turf/error')
    }
  }, []);


  let register = {
    image: "https://wallpaperaccess.com/full/1767917.jpg",
    title: "BOOKING HISTORY",
    description: "Here admin can view the booking history",
    button: "VIEW LIST",
    link: "/turf/bookingHistory",
  };

  let bookinglist = {
    image: "https://wallpaperaccess.com/full/1767907.jpg",
    title: "REGISTER YOUR TURF",
    description: "Here you can register your turf in Sportopia",
    button: "REGISTER NOW",
    link: "/turf/registration",
  };
  let viewTurfs = {
    image: "https://wallpaperaccess.com/full/1768040.jpg",
    title: "VIEW TURF DETAILS",
    description: "Here admin can view his turf details",
    button: "VIEW NOW",
    link: "/turf/listing",
  };

  return (
    <>
      <div className="flex justify-center md:justify-start">
        <div className="md:text-xl text-black font-bold tracking-[6px] md:ml-8 mt-5">
          WELCOME TURF ADMIN
        </div>
      </div>
      <Carousal slides={banner?banner:''} interval={4} />
      <div class="flex flex-wrap bg-black m-1">
        <Cards reg={register} />
        <Cards reg={bookinglist} />
        <Cards reg={viewTurfs} />
      </div>
      <div class="max-w-xl mx-auto text-center py-24 md:py-32">
        <div class="w-24 h-2 bg-black mb-4 mx-auto"></div>
        <h2 class="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
          WHERE SPORTS THRIVE
        </h2>
        <p class="font-light text-gray-600 mb-6 leading-relaxed">
          Enjoy the convenience of real-time updates and effortlessly keep your
          turf buzzing with energy. Take charge, create an environment where
          sports flourish, and leave your mark as a leader in the world of
          sports facilities."
        </p>
      </div>
      <div class="relative rounded-lg py-12 px-12 mr-1 ml-1  mt-1">
        <div class="relative z-10 text-center py-12 md:py-24">
          <h1 class="text-white hover:text-slate-300 text-center text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-display font-bold mb-6">
            JOIN IN CLUBS
          </h1>
          <p class="text-white mb-10 text-base md:text-lg font-bold">
             Dive into a community of like-minded
            individuals who share your enthusiasm for sports and active living.
          </p>
          <button
            href="/pages/about-us"
            class="inline-block bg-black text-white uppercase border-2 border-white text-sm tracking-widest font-heading px-8 py-4"
          >
            {" "}
            <Link to="/clubs">JOIN IN CLUBS</Link>
          </button>
        </div>
        <img
          src="https://wallpaperaccess.com/full/1767837.jpg"
          class="w-full h-full absolute inset-0 object-cover"
        />
      </div>
    </>
  );
}

export default TurfHome;

import React, { useEffect, useState } from "react";
import Carousal from "../../Utilities/Carousal";
import { Link } from "react-router-dom";
import AdminAxios from "../../../Axios/adminAxios";

function UserHome() {
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
      navigate('/error')
    }
  }, []);

  return (
    <>
      <div className="flex justify-center md:justify-between">
        <div className="md:text-xl text-black font-bold hidden md:block md:tracking-[6px] ml-8 mt-5">
          FOR ALL SPORTS LOVERS
        </div>
        <div className="text-xl text-black font-semibold md:tracking-[6px] mr-8 mt-5  hover:text-gray-200">
          <Link to="/turf/login">LOGIN AS TURF ADMIN</Link>
        </div>
      </div>
      <Carousal slides={banner ? banner : ""} interval={3} />

      <div className="max-w-xl mx-auto text-center py-24 md:py-32">
        <div className="w-24 h-2 bg-black mb-4 mx-auto"></div>
        <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-5xl mb-6 m-1">
          FUELING YOUR SPORTING JOURNEY
        </h2>
        <p className="font-light text-gray-600 mb-6 leading-relaxed m-2 md:m-0">
          "Welcome to Sportopia, where passion and performance converge. We are
          dedicated to nurturing your athletic spirit and pushing your limits.
          Through innovation, teamwork, and dedication, we provide a platform
          where sports enthusiasts of all levels can pursue their passions and
          achieve greatness. Join us on a journey of growth, competition, and
          triumph, as we celebrate the exhilarating world of sports together."
        </p>
      </div>

      <div className="relative rounded-lg py-12 px-12 mr-1 ml-1  mt-1">
        <div className="relative z-10 text-center py-12 md:py-24">
          <h1 className="text-white hover:text-slate-300 text-center text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-display font-bold mb-6">
            JOIN IN CLUBS
          </h1>
          <p className="text-white mb-10 text-base md:text-lg font-bold">
            Dive into a community of like-minded individuals who share your
            enthusiasm for sports and active living.
          </p>
          <button
            href="/pages/about-us"
            className="inline-block bg-black text-white uppercase border-2 border-white text-sm tracking-widest font-heading px-8 py-4"
          >
            {" "}
            <Link to="/clubs">JOIN IN CLUBS</Link>
          </button>
        </div>
        <img
          src="https://wallpaperaccess.com/full/1767882.jpg"
          className="w-full h-full absolute inset-0 object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mr-1 ml-1 mt-1">
        <div className="bg-white p-12 md:p-24 flex justify-start items-center">
          <a href="/blog/my-third-big-post/">
            <img
              src="https://wallpaperaccess.com/full/1767837.jpg"
              className="w-full max-w-md"
            />
          </a>
        </div>
        <div className="md:order-first bg-gray-100 p-12 md:p-24 flex justify-end items-center">
          <div className="max-w-md">
            <div className="md:ml-4 md:w-96 h-2 bg-black mb-4"></div>
            <h2 className="font-display font-bold text-2xl md:text-2xl lg:text-3xl mb-6">
              BOOK YOUR FAVOURITE TURF
            </h2>
            <p className="font-light text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
              "Experience convenience like never before with our 'Book Your
              Favorite Turf' feature. Whether you're gearing up for an intense
              match or simply looking for a place to have fun with friends, our
              seamless booking system empowers you to reserve the turf that
              suits your needs. Say goodbye to hassles and long waits – with
              just a few clicks, you can secure your spot on the field and get
              ready to play"
            </p>
            <button className="inline-block border-2 border-black font-light text-black text-sm uppercase tracking-widest py-3 px-8 hover:bg-black hover:text-white">
              {" "}
              <Link to="/getTurfs">VIEW TURFS</Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHome;

import React from "react";
import turfaxios from "../../../Axios/turfAxios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function TurfListing() {
  const [turfData, setTurfData] = useState([]);
  const navigate=useNavigate()
  const Turfaxios=turfaxios()

  const editTurf=(id)=>{
    navigate(`/turf/editTurf/${id}`)
  }

  useEffect(() => {
    Turfaxios.get("/getTurfsAdmin")
      .then((response) => {
        setTurfData(response.data.result);
      })
      .catch((err) => {
        console.log(err);
        navigate('/turf/error')
      });
  }, []);
  return (
    <>
      {turfData.map((result) => {
        return (
          <div className="container flex flex-col items-center md:flex-row md:justify-around bg-gray-900 bg-opacity-60 mt-7 md:ml-auto md:mr-auto  rounded-md mb-7 border border-black">
            <div className="mb-auto mt-auto flex">
              <div className="bg-gradient-to-r from-gray-800 to-gray-600 w-[10rem] h-[10rem] m-auto mt-3 flex justify-center">
                <img
                  className="w-[6rem] h-[6rem] mb-auto mt-auto"
                  src={result.logo}
                />
              </div>
            </div>
            <div>
              <ul className="mt-4 mb-4">
                <h2 className="font-bold mt-4 text-lg text-white trackinge-wide">
                  {result.turfName}
                </h2>
                <li className="font-semibold mt-3  text-gray-400">
                  City:{result.city}
                </li>
                <li className="font-semibold mt-3  text-gray-400">
                  Type:{result.turfType}
                </li>
                <li className="font-semibold mt-3  text-gray-400">
                  Phone:{result.phone}
                </li>
                <li className="font-semibold mt-3  text-gray-400">
                  Amount:₹{result.total}
                </li>
              </ul>
            </div>
            <div className="my-auto">
              <button onClick={()=>{editTurf(result._id)}} className="bg-black w-[6rem]  h-[2rem] hover:bg-slate-700 rounded-md text-white mb-3 font-bold ">
                EDIT
              </button>
            </div>
          </div>
        );
      })}
    </>
  );  
}

export default TurfListing;

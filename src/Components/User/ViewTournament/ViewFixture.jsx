import React, { useEffect, useRef, useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import { useParams } from "react-router-dom";

function ViewFixture() {

    const userAxios = UserAxios();
    const { id } = useParams();
    const [matches, setMatches] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAxios.get(`findMatches?id=${id}`);
        if (response.data) {
          setMatches(response?.data?.matches);
        }
      } catch (error) {
        console.error(error);
        navigate('/error')
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-gray-800  m-1 min-h-screen'>
        <div className="flex justify-center bg-black bg-opacity-60 mb-10 ">
        <div className="mt-2 mb-2 mx-3   md:text-xl text-white font-bold tracking-wide">
          TOURNAMENT FIXTURE
        </div>
      </div>
      <div className="grid grid-cols-12 m-1">
        {matches.length?matches.map((match)=>(
              <div className="md:col-span-4 col-span-12 bg-black h-40 bg-opacity-40 m-3 grid grid-cols-12">
              <div className="col-span-4  m-4 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <img className="rounded-full w-20 h-20" src={match?.teamOne?.logo} alt="" />
                  <h3 className="text-center text-sm text-white font-semibold mt-3 ">{match?.teamOne?.clubName}</h3>
                  </div>
              </div>
              <div className="col-span-4 flex flex-col justify-center items-center">
                <div className="flex flex-col text-white text-sm font-semibold justify-center items-center">
                  <h3 className=" text-gray-400">{match?.matchName}</h3>
                  {match?.scoreOne&&match?.scoreTwo?
                  <div className="flex justify-center m-4">
                  <span className="bg-gray-800 text-center font-bold text-xl h-10 pt-1 w-16 rounded-sm">{match?.scoreOne}</span>
                  <span className="text-2xl mx-2 font-bold">:</span>
                  <span className="bg-gray-800 rounded-sm text-center font-bold text-xl pt-1 h-10 w-16">{match?.scoreTwo}</span>
                  </div>:<><h3 className="text-red-600 text-2xl mb-2 mt-4">VS</h3>
                  <h3>{new Date(`1970-01-01T${match?.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</h3></>}
                  <h3>{match ? match.date.split("T")[0] : ""}</h3>
                </div>
              </div>
              <div className="col-span-4 m-4 flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <img className="rounded-full w-20 h-20" src={match?.teamTwo?.logo} alt="" />
                  <h3 className="text-center text-white text-sm font-semibold mt-3 ">{match?.teamTwo?.clubName}</h3>
                  </div>
              </div>
            </div>
           )): <div className="flex justify-center  col-span-12 min-h-screen  ">
           <div className="mt-4 md:mr-2 md:text-xl text-gray-500 font-bold tracking-wide">
             FIXTURE NOT AVAILABLE
           </div>
         </div>}
          </div>
        </div>
        
  )
}

export default ViewFixture
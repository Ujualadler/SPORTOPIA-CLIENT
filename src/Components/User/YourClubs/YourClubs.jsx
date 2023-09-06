import React from "react";
import Useraxios from "../../../Axios/userAxios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function YourClubs() {
  const userAxios = Useraxios();
  const [clubData, setClubData] = useState([]);
  const [status, setStatus] = useState("");
  const [SearchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const clubUserHome = (id) => {
    navigate(`/clubUserHome/${id}`);
  };

  useEffect(() => {
    setLoading(true); // Set loading to true before making the API call

    userAxios
      .get("/yourClubs")
      .then((response) => {
        setClubData(response.data.clubs);
        setStatus(response.data.userStatuses);
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API call completes
      });
  }, []);

  return (
    <>
      <div className="flex justify-center md:justify-between">
        <div className="mt-8 mx-11 hidden md:block text-white  md:text-xl font-bold tracking-wide">
          YOUR CLUBS
        </div>
        <div className=" transition-transform duration-100 mt-8   text-xl font-bold tracking-wide">
          <div className="">
            <input
              type="search"
              value={SearchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="SEARCH CLUB"
              className="border text-center border-black block p-2  md:mr-12  text-sm text-gray-900 cmax-h-10  rounded-lg w-80 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gradient-to-r from-gray-500 to-gray-300 dark:border-black dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center mt-40 h-80">
          <ClipLoader color="#ffffff" loading={loading} size={150} />
        </div>
      ) : clubData.length ? (
        clubData
          .filter((club) =>
            club.clubName.toLowerCase().includes(SearchInput.toLowerCase())
          )
          .map((result) => {
            return (
              <div className="container flex flex-col items-center md:flex-row md:justify-around  bg-gray-900 bg-opacity-60 mt-7 ml-auto mr-auto rounded-md mb-7 border border-black">
                <div className="mb-auto mt-auto flex">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-600  w-[10rem] h-[10rem] mt-3 md:m-2 flex justify-center">
                    <img
                      className="w-[6rem] h-[6rem] mb-auto mt-auto"
                      src={result ? result.logo : ""}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <ul className="mt-4 mb-4 ">
                    <h2 className="font-bold text-center mt-4 text-lg text-white trackinge-wide">
                      {result ? result.clubName : ""}
                    </h2>
                    <li className="font-semibold mt-3 text-center  text-gray-400">
                      ADMIN:{result ? result.admin.name : ""}
                    </li>
                    <li className="font-semibold mt-3 text-center  text-gray-400">
                      TYPE:{result ? result.clubType : ""}
                    </li>
                  </ul>
                </div>
                <div className="my-auto">
                  {status.find((userStatus) => userStatus.clubId === result._id)
                    ?.status === "accepted" ? (
                    <button
                      className="bg-black w-[7rem] mb-3 h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold "
                      onClick={() => clubUserHome(result._id)}
                    >
                      VIEW
                    </button>
                  ) : (
                    <button className="bg-black w-[7rem] mb-3 h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold ">
                      REQUESTED
                    </button>
                  )}
                </div>
              </div>
            );
          })
      ) : (
        <div className="flex justify-center  mt-40 h-80">
          <div className=" text-white text-xl font-bold tracking-wide">
            NO CLUBS AVAILABLE
          </div>
        </div>
      )}
    </>
  );
}

export default YourClubs;

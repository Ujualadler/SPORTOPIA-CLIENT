import React from "react";
import Useraxios from "../../../Axios/userAxios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ClubList() {
  const userAxios = Useraxios();
  const [clubData, setClubData] = useState([]);
  const [user, setUser] = useState(false);
  const [status, setStatus] = useState(false);
  const [SearchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const clubHome = async (id) => {
    try {
      const response = await userAxios.post("/joinClub", { id });
      if (response.data.status) {
        setStatus(true);
        toast.success("REQUEST SENDED");
      }
    } catch (error) {
      console.log(error);
      navigate('/error')
    }
  };

  useEffect(() => {
    userAxios
      .get("/getClubs")
      .then((response) => {
        console.log(response.data);
        setClubData(response.data.result);
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      });
  }, [status]);
  return (
    <>
      <div className="flex justify-center md:justify-between">
        <div className="mt-8 mx-11 hidden md:block font-heading text-white uppercase md:tracking-widest  md:text-xl font-bold tracking-wide">
          JOIN IN A CLUB
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
      <div className="flex justify-center md:justify-end md:text-xl font-bold tracking-wide">
        <div className=" mt-4 md:mr-12 text-white cursor-pointer bg-black text-center cmax-h-10  p-2  rounded-lg w-80  md:text-sm font-bold tracking-wide ">
          <div onClick={() => navigate("/createClub")} className="  relative">
            CREATE A CLUB
          </div>
        </div>
      </div>
      {clubData.length ? (
        clubData
          .filter((club) =>
            club.clubName.toLowerCase().includes(SearchInput.toLowerCase())
          )
          .map((result) => {
            return (
              <div className="container flex flex-col items-center md:flex-row md:justify-around bg-gray-900 bg-opacity-80 mt-7 ml-auto mr-auto rounded-md mb-7 border border-black">
                <div className="mb-auto mt-auto flex">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-500 w-[10rem] h-[10rem] mt-3 md:m-2 flex justify-center">
                    <img
                      className="w-[6rem] h-[6rem]  mb-auto mt-auto"
                      src={result.logo}
                    />
                  </div>
                </div>
                <div>
                  <ul className="mt-4 mb-4">
                    <h2 className="font-bold mt-4 text-lg trackinge-wide text-white">
                      {result.clubName}
                    </h2>
                    <li className="font-semibold mt-3  text-gray-400">
                      ADMIN:{result.admin.name}
                    </li>
                    <li className="font-semibold mt-3  text-gray-400">
                      TYPE:{result.clubType}
                    </li>
                  </ul>
                </div>
                <div className="my-auto">
                  <button
                    onClick={() => {
                      clubHome(result._id);
                      setUser(true);
                    }}
                    className="bg-black w-[7rem] mb-3 h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold "
                  >
                    JOIN
                  </button>
                </div>
              </div>
            );
          })
      ) : (
        <div className="flex justify-center mt-36 h-screen">
          <div className="mt-8 mx-11 hidden md:block text-white md:text-xl font-bold tracking-wide">
            NO CLUBS AVAILABLE
          </div>
        </div>
      )}
    </>
  );
}

export default ClubList;

import React, { useEffect, useState } from "react";
import Useraxios from "../../../Axios/userAxios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";


function YourTournaments() {
  
  const userAxios = Useraxios();
  const navigate = useNavigate();
  const [tournamentData, setTournamentData] = useState("");
  const [loading, setLoading] = useState(true);
  const clubId = useSelector((state) => state.Club.clubId);
  const { role } = useParams();

  useEffect(() => {
    setLoading(true);
    const getData = async (req, res) => {
      try {
        const res = await userAxios.get(`/getYourTournaments?id=${clubId}`);
        if (res) {
          setTournamentData(res.data.result);
          setLoading(false); // Set loading to false after the API call completes
        }
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    };
    getData();
  }, []);

  function convertISODateToReadable(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  const viewTournament = (id) => {
    navigate(`/viewTournament/${id}/${role}`);
  };

  const editTournament = (id) => {
    navigate(`/editTournament/${id}`);
  };

  return (
    <>
      <div className="flex justify-center md:justify-between  ">
        <div className="mt-8 mx-11 hidden md:block  md:text-xl text-white font-bold tracking-wide">
          YOUR TOURNAMENTS
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center mt-40 h-80">
          <ClipLoader color="#ffffff" loading={loading} size={150} />
        </div>
      ) : tournamentData.length ? (
        tournamentData.map((result) => {
          return (
            <div className="container flex flex-col items-center md:flex-row md:justify-around  bg-gray-900 bg-opacity-60 mt-7 ml-auto mr-auto rounded-md mb-7 border border-black">
              <div className="mb-auto mt-auto flex">
                <div className="bg-gradient-to-r from-gray-800 to-gray-400  w-[10rem] h-[10rem] mt-3 md:m-2 flex justify-center">
                  <img
                    className="w-[6rem] h-[6rem] mb-auto mt-auto"
                    src={result.clubId.logo}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <ul className="mt-4 mb-4 ">
                  <h2 className="font-bold mt-4 text-center text-lg text-white trackinge-wide">
                    {result.tournamentName}
                  </h2>
                  <li className="font-semibold mt-3 text-center text-gray-400">
                    Sports type:{result.sportsType}
                  </li>
                  <li className="font-semibold mt-3 text-center  text-gray-400">
                    Starting Date:
                    {convertISODateToReadable(result.startingDate)}
                  </li>
                  <li className="font-semibold mt-3 text-center  text-gray-400">
                    Ending Date:{convertISODateToReadable(result.endingDate)}
                  </li>
                </ul>
              </div>
              <div className="my-auto">
                {result.isCancelled ? (
                  <button className="bg-black w-[7rem] mb-3 h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold ">
                    CANCELLED
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        viewTournament(result._id);
                      }}
                      className="bg-black w-[7rem] mb-3 h-[2rem] mr-4 hover:bg-slate-700 rounded-md text-white md:font-bold "
                    >
                      VIEW
                    </button>
                    {role === "admin" ? (
                      <button
                        onClick={() => {
                          editTournament(result._id);
                        }}
                        className="bg-black w-[7rem] mb-3 h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold "
                      >
                        EDIT
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center mt-36 h-screen">
          <div className="mt-8 mx-11 hidden md:block text-white md:text-xl font-bold tracking-wide">
            NO TOURNAMENT AVAILABLE
          </div>
        </div>
      )}
    </>
  );
}

export default YourTournaments;

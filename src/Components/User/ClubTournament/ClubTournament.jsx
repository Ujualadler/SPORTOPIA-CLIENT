import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Useraxios from "../../../Axios/userAxios";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";


function ClubTournament() {
  const navigate = useNavigate();
  const [tournamentData, setTournamentData] = useState("");
  const [loading, setLoading] = useState(true);
  const userAxios = Useraxios();
  const clubId = useSelector((state) => state.Club.clubId);

  useEffect(() => {
    setLoading(true);

    const getData = async (req, res) => {
      try {
        const res = await userAxios.get(`/getTournaments?id=${clubId}`);
        if (res) {
          console.log(res.data.result);
          setTournamentData(res.data.result);
          setLoading(false); // Set loading to false after the API call completes

        }
      } catch (error) {
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

  const viewTournament = (id, role) => {
    navigate(`/viewTournament/${id}/${role}`);
  };

  const tournaments = (role) => {
    navigate(`/yourTournaments/${role}`);
  };

  return (
    <>
      <div className="flex justify-center md:justify-between  ">
        <div className="mt-8 mx-11 hidden md:block  md:text-xl text-white font-bold tracking-wide">
          UPCOMING TOURNAMENTS
        </div>
        <div className=" mt-8 mx-11 text-white cursor-pointer bg-black text-center cmax-h-10  p-2 rounded-lg w-80  md:text-sm font-semibold tracking-wide ">
          <div
            onClick={() => navigate("/createTournament")}
            className=" border-b-2 hover:bg-gray-900 m-1"
          >
            <p className="mb-1">CREATE A TOURNAMENT</p>
          </div>
          <div
            onClick={() => navigate("/joinedTournaments")}
            className="hover:bg-gray-900 m-1 border-b-2"
          >
            <p className="mb-1">JOINED TOURNAMENTS</p>
          </div>
          <div
            onClick={() => tournaments("admin")}
            className="hover:bg-gray-900 m-1"
          >
            YOUR TOURNAMENTS
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center mt-40 h-80">
          <ClipLoader color="#ffffff" loading={loading} size={150} />
        </div>
      ) : tournamentData.length != 0 ? (
        tournamentData.map((result) => {
          return (
            <div className="container flex flex-col items-center md:flex-row md:justify-around  bg-gray-900 bg-opacity-60 mt-7 ml-auto mr-auto rounded-md mb-7 border border-black">
              <div className="mb-auto mt-auto flex">
                <div className="bg-gradient-to-r from-gray-800 to-gray-400  w-[10rem] h-[10rem] mt-3 md:m-2 flex justify-center">
                  <img
                    className="w-[6rem] h-[6rem] mb-auto mt-auto"
                    src={result?.clubId.logo}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <ul className="mt-4 mb-4 ">
                  <h2 className="font-bold mt-4 text-lg text-center text-white trackinge-wide">
                    {result?.tournamentName}
                  </h2>
                  <li className="font-semibold mt-3 text-center  text-gray-400">
                    Sports type:{result?.sportsType}
                  </li>
                  <li className="font-semibold mt-3 text-center  text-gray-400">
                    Starting Date:
                    {convertISODateToReadable(result?.startingDate)}
                  </li>
                  <li className="font-semibold mt-3 text-center  text-gray-400">
                    Ending Date:{convertISODateToReadable(result?.endingDate)}
                  </li>
                  <li className="font-semibold mt-3 text-center  text-gray-400">
                    No of club joined:{result?.joinedClubs?.length}/
                    {result?.maximumTeams}
                  </li>
                </ul>
              </div>
              <div className="my-auto">
                <button
                  onClick={() => {
                    viewTournament(result?._id, "admin");
                  }}
                  className="bg-black w-[7rem] mb-3 h-[2rem] hover:bg-slate-700 rounded-md text-white md:font-bold "
                >
                  VIEW
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center mt-36 h-screen">
          <div className="mt-8 mx-11  text-white md:text-xl font-bold tracking-wide">
            NO TOURNAMENT AVAILABLE
          </div>
        </div>
      )}
    </>
  );
}

export default ClubTournament;

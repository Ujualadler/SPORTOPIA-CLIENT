import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Useraxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ViewTournament() {
  const userAxios = Useraxios();
  const { id } = useParams();
  const clubId = useSelector((state) => state.Club.clubId);
  const [tournamentData, setTournamentData] = useState("");
  const [join, setJoin] = useState(false);
  const [clubs, setClubs] = useState("");
  const [winners, setWinners] = useState("");
  const navigate = useNavigate();
  const { role } = useParams();

  useEffect(() => {
    const getData = async (req, res) => {
      try {
        const res = await userAxios.get(
          `/getTournamentDetails?id=${id}&clubId=${clubId}`
        );
        if (res.data.result) {
          setTournamentData(res.data.result);
          setClubs(res.data.clubs);
          setWinners(res.data.winners);
          setJoin(res.data.status);
        } else if (res.data.data) {
          setTournamentData(res.data.data);
          setClubs(res.data.clubs);
          setWinners(res.data.winners);
          setJoin(res.data.status);
        } else if (res.data.joined) {
          setClubs(res.data.clubs);
          setWinners(res.data.winners);
          setTournamentData(res.data.joined);
          setJoin(res.data.status);
        }
        
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
    };
    getData();
  }, []);

  function convertISODateToReadable(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  }

  function formatTimeTo12Hr(timeStr) {
    if (!timeStr) {
      return "";
    }

    const [hours, minutes] = timeStr.split(":");
    const parsedHours = parseInt(hours);
    const period = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours =
      parsedHours === 0
        ? 12
        : parsedHours > 12
        ? parsedHours - 12
        : parsedHours;

    return `${formattedHours}:${minutes} ${period}`;
  }

  const handleDownloadClick = () => {
    if (tournamentData?.detailedDocument) {
      // Construct the Cloudinary URL with download transformation
      const cloudinaryUrl = `${tournamentData.detailedDocument}?fl_attachment=true`;

      // Create a hidden anchor element and click it to trigger the download
      const a = document.createElement("a");
      a.href = cloudinaryUrl;
      a.download = "detailed_document.pdf";
      a.click();
    }
  };

  const joinTournament = async (id) => {
    try {
      const response = await userAxios.post(`/joinTournament`, { clubId, id });
      if (response.data.result === "success") {
        toast.success("Successfully joined");
        navigate("/joinedTournaments");
      } else if (response.data.result === "joined") {
        toast.error("You are already part of this tournament");
      } else if (response.data.result === "limit") {
        toast.error("Team limit reached");
      } else {
        toast.error("Failed to join");
      }
    } catch (error) {
      console.log(error);
      navigate('/error')
    }
  };

  const leaveTournament = async () => {
    try {
      const response = await userAxios.get(
        `/leaveTournament?id=${id}&clubId=${clubId}`
      );
      if (response.data.status === true) {
        toast.success("You left the tournament");
        navigate("/tournaments");
      }
    } catch (error) {
      console.log(error);
      navigate('/error')
    }
  };

  const cancelTournament = async () => {
    try {
      const response = await userAxios.get(`/cancelTournament?id=${id}`);
      if (response.data.status === true) {
        toast.success("Tournament Cancelled");
        navigate("/yourTournaments");
      }
    } catch (error) {
      console.log(error);
      navigate('/error')
    }
  };

  const addFixture = (id) => {
    navigate(`/addFixture/${id}`);
  };

  const viewFixture = (id) => {
    navigate(`/viewFixture/${id}`);
  };

  return (
    <>
      <div className="flex justify-center bg-black bg-opacity-60 m-2 ">
        <div className="mt-2 mb-2 mx-3   md:text-2xl text-white font-bold tracking-wide">
          {tournamentData?.tournamentName}
        </div>
      </div>
      <div className="text-white bg-gray-900 bg-opacity-60 m-2 md:p-8 p-4">
        <h2 className="m-2 font-bold">ABOUT</h2>
        <h4 className="m-2">{tournamentData?.description}</h4>
      </div>
      {winners ? (
        <div>
          <div className="flex justify-center bg-black bg-opacity-60 m-2 ">
            <div className="mt-2 mb-2 mx-3   md:text-xl text-white font-bold tracking-wide">
              WINNERS
            </div>
          </div>
          <div className="grid grid-cols-12 m-2 bg-gray-900">
            <div className="md:col-span-5 col-span-12">
              <img
                className="m-1 w-full h-fit"
                src="https://img.freepik.com/premium-photo/high-tech-trophy-generate-ai_98402-5455.jpg"
                alt=""
              />
            </div>
            <div className="md:col-span-7 col-span-12 flex flex-col justify-center items-center">
              <div className="flex md:flex-row flex-col  sm:justify-around">
                <div className="m-5 md:m-0 md:mr-5">
                  <h3 className="text-yellow-700 underline font-bold md:text-2xl text-xl text-center mb-5">
                    CHAMPIONS
                  </h3>
                  <div className="flex">
                    <img
                      className="md:w-28 md:h-28 h-20 w-20 mr-3 rounded-full"
                      src={winners?.first?.logo}
                      alt=""
                    />
                    <div className="flex justify-center items-center">
                      <h3 className="text-white md:text-2xl xl text-lg text-center ml-3 font-bold">
                        {winners?.first?.clubName}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="m-5 md:m-0 md:ml-5">
                  <h3 className="text-yellow-700 underline font-bold md:text-2xl xl text-center mb-5">
                    RUNNER UP
                  </h3>
                  <div className="flex">
                    <img
                      className="md:w-28 md:h-28 h-20 w-20 mr-3 rounded-full"
                      src={winners?.second?.logo}
                      alt=""
                    />
                    <div className="flex justify-center items-center">
                      <h3 className="text-white md:text-2xl text-lg text-center ml-3 font-bold">
                        {winners?.second?.clubName}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="bg-black bg-opacity-60 m-2 md:p-3 p-5">
        <ul className="max-w-md divide-y ml-auto mr-auto divide-gray-200 dark:divide-gray-700">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  SPORTS TYPE
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {tournamentData?.sportsType}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  MAXIMUM ALLOWED TEAMS
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {tournamentData?.maximumTeams}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  NO OF TEAMS JOINED
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {tournamentData?.joinedClubs?.length}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  STARTING DATE
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {convertISODateToReadable(tournamentData?.startingDate)}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  ENDING DATE
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {convertISODateToReadable(tournamentData?.endingDate)}
              </div>
            </div>
          </li>
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  STARTING TIME
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {formatTimeTo12Hr(tournamentData?.startingTime)}
              </div>
            </div>
          </li>
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  ENDING TIME
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {formatTimeTo12Hr(tournamentData?.endingTime)}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex justify-center bg-gray-900 bg-opacity-60 m-2 ">
        <div className="mt-2 mb-2 hidden md:block  md:text-lg text-white font-bold tracking-wide">
          TEAMS JOINED
        </div>
      </div>
      <div className="grid grid-cols-6 m-2">
        {clubs.length
          ? clubs.map((club) => (
              <div className="md:col-span-1 col-span-2 object-cover m-1">
                <img src={club?.logo} alt="" className="w-full md:h-48 h-28" />
                <h3 className="text-center p-1 bg-gray-900 bg-opacity-60 text-white font-semibold">
                  {club?.clubName}
                </h3>
              </div>
            ))
          : ""}
      </div>
      {clubs.length === 0 ? (
        <div className="flex justify-center items-center h-60 bg-black bg-opacity-60 m-2 ">
          <div className="mb-2 hidden md:block  md:text-lg text-gray-400 font-bold tracking-wide">
            No teams joined yet......
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-between bg-gray-900 bg-opacity-60 m-2 p-3 text-white ">
        <button
          onClick={handleDownloadClick}
          className="md:text-md md:font-bold bg-black bg-opacity-60 h-[2rem] w-[8rem] rounded-sm text-sm"
        >
          DOWNLOAD PDF
        </button>
        {join === true ? (
          <button
            onClick={() => joinTournament(tournamentData._id)}
            className="font-bold bg-red-900 h-[2rem] w-[5rem]  rounded-sm"
          >
            JOIN
          </button>
        ) : join === "join" ? (
          <button
            onClick={leaveTournament}
            className="font-bold bg-red-900 h-[2rem] w-[5rem]  rounded-sm"
          >
            LEAVE
          </button>
        ) : join === false && role === "admin" ? (
          <button
            onClick={cancelTournament}
            className="font-bold bg-red-900 h-[2rem] w-[5rem]  rounded-sm"
          >
            CANCEL
          </button>
        ) : (
          ""
        )}
        {join === false && role === "admin" ? (
          <button
            className="font-bold bg-black text-white h-[2rem] w-[8rem] rounded-sm"
            onClick={() => addFixture(tournamentData._id)}
          >
            ADD FIXTURE
          </button>
        ) : (
          <button
            className="font-bold bg-black text-white h-[2rem] w-[8rem] rounded-sm"
            onClick={() => viewFixture(tournamentData._id)}
          >
            VIEW FIXTURE
          </button>
        )}
      </div>
    </>
  );
}

export default ViewTournament;

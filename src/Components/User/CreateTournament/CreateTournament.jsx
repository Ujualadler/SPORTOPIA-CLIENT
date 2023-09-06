import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CreateTournament = () => {
  const clubId = useSelector((state) => state.Club.clubId);
  const [tournamentName, setTournamentName] = useState("");
  const [description, setDescription] = useState("");
  const [sportsType, setSportsType] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [maximumTeams, setMaximumTeams] = useState("");
  const [detailedDocument, setDetailedDocument] = useState("");
  const navigate = useNavigate();

  const userAxios = UserAxios();

  const pdf = useRef();

  const successToast = (msg) => {
    toast.success(msg);
  };

  const errorToast = (msg) => {
    toast.error(msg);
  };

  const uploadFile = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /\.(pdf)$/i; // Only allow PDF files
    if (!allowedExtensions.test(file.name)) {
      toast.error("Invalid file format. Only PDF files are allowed.");
      return;
    }
    setDetailedDocument(file);
  };

  const getMinDate = () => {
    const today = new Date();
    const minStartingDate = new Date(today);
    minStartingDate.setDate(today.getDate() + 5);

    const year = minStartingDate.getFullYear();
    const month = String(minStartingDate.getMonth() + 1).padStart(2, "0");
    const day = String(minStartingDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const createTournamnet = async (e) => {
    e.preventDefault();

    const tournaments = (role) => {
      navigate(`/yourTournaments/${role}`);
    };

    
    const generateError = (err) => toast.error(err);
 
    if (
      !tournamentName.trim() ||
      !sportsType.trim() ||
      !description.trim() ||
      !startingDate.trim() ||
      !endingDate.trim() ||
      !startingTime.trim() ||
      !endingTime.trim() ||
      !maximumTeams.trim() ||
      !detailedDocument
    ) {
      generateError("Please fill in all the fields");
      return;
    }
    if (!sportsType||sportsType ==='Select a sport') {
      generateError("Select a sports type");
      return;
    }
    if (!maximumTeams||maximumTeams ==='Select no of teams') {
      generateError("Select no of teams");
      return;
    }
    const today = new Date();
    const minStartingDate = new Date();
    minStartingDate.setDate(today.getDate() + 5);

    if (startingDate <= minStartingDate) {
      generateError("Starting date should be at least 5 days ahead of today");
      return;
    }
    if (selectedSport ==='Select a sport') {
      generateError("Select a sports type");
      return;
    }
    if (startingDate > endingDate) {
      generateError(
        "Ending date and time should be after starting date and time"
      );
      return;
    }
    if (startingTime >= endingTime) {
      generateError(
        "Ending date and time should be after starting date and time"
      );
      return;
    }

    userAxios
      .post(
        `/createTournament`,
        {
          tournamentName,
          sportsType,
          startingDate,
          description,
          startingTime,
          endingDate,
          endingTime,
          detailedDocument,
          maximumTeams,
          clubId,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          successToast("Tournament Successfully Created");
          tournaments("admin");
        } else {
          errorToast(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      });
  }; 

  const sports = [
    { value: "football", label: "FOOTBALL" },
    { value: "cricket", label: "CRICKET" },
    { value: "badminton", label: "BADMINTON" },
    { value: "basketball", label: "BASKETBALL" },
    { value: "hockey", label: "HOCKEY" },
    { value: "others", label: "OTHERS" }
  ];

  const noOfTeams = [
    { value: "football", label: "2" },
    { value: "cricket", label: "4" },
    { value: "badminton", label: "8" },
    { value: "basketball", label: "16" },
    { value: "hockey", label: "32" },
  ];

  const handleSportChange = (event) => {
    setSportsType(event.target.value);
  };

  const handleTeamChange = (event) => {
    setMaximumTeams(event.target.value);
  };

  return (
    <form className="h-full" onSubmit={createTournamnet}>
      <div className=" block md:flex md:ml-12 md:mr-12 ">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 m-7 ml-1.5 border border-gray-700 bg-gray-900 bg-opacity-60 shadow-2xl">
          <div className="flex justify-between">
            <span className="text-xl font-semibold font-heading text-white uppercase md:tracking-widest block">
              CREATE A TOURNAMENT
            </span>
          </div>

          <div className="w-full p-8 mx-2">
            <div className="pdf-container md:w-[25rem] mb-2">
              {detailedDocument && (
                <iframe
                  src={URL.createObjectURL(
                    detailedDocument ? detailedDocument : ""
                  )}
                  title="PDF Viewer"
                  width="100%"
                  height="300"
                  frameBorder="0"
                />
              )}
            </div>
            <div className="flex-col">
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    pdf.current.click();
                  }}
                  className="rounded hover:rounded-lg bg-black w-[12rem] h-[4rem] hover:bg-slate-900 text-white"
                >
                  ADD A DETAILED PDF
                </button>
                <input
                  className="hidden"
                  ref={pdf}
                  accept="application/pdf"
                  onChange={uploadFile}
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 border m-7 ml-1 border-gray-700 bg-gray-900 bg-opacity-60 lg:ml-4 shadow-2xl">
          <div className="rounded shadow p-6">
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Tournament name
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400  rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="Enter tournament name"
                  onChange={(e) => {
                    setTournamentName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-2">
              <label
                htmlFor="sports"
                className="block font-semibold text-gray-200"
              >
                Select a sport:
              </label>
              <select
                id="sports"
                name="sports"
                value={sportsType}
                onChange={handleSportChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-r shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              >
                {sportsType === "" && <option value="">Select a sport</option>}
                {sports.map((sport) => (
                  <option className="h-28" key={sport.value} value={sport.value}>
                    {sport.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Description
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full pb-48 break-word"
                  type="text"
                  placeholder="Enter description of the tournament"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-2">
              <label
                htmlFor="sports"
                className="block font-semibold text-gray-200"
              >
                Select no of teams:
              </label>
              <select
                id="sports"
                name="sports"
                value={maximumTeams}
                onChange={handleTeamChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-r shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
              >
                {maximumTeams === "" && <option value="">Select no of teams</option>}
                {noOfTeams.map((sport) => (
                  <option className="h-28" key={sport.value} value={sport.value}>
                    {sport.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Starting date
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full break-word"
                  type="date"
                  min={getMinDate()}
                  placeholder="Enter starting date of the tournament"
                  onChange={(e) => {
                    setStartingDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Ending date
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full  break-word"
                  type="date"
                  min={getMinDate()}
                  placeholder="Enter ending date of the tournament"
                  onChange={(e) => {
                    setEndingDate(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Starting time
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full break-word"
                  type="time"
                  placeholder="Enter starting time of the tournament"
                  onChange={(e) => {
                    setStartingTime(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Ending time
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full "
                  type="time"
                  placeholder="Enter ending time of the tournament"
                  onChange={(e) => {
                    setEndingTime(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                type="submit"
                className="rounded hover:rounded-lg bg-black w-[8.5rem] h-[2rem] hover:bg-slate-900 text-white"
              >
                CREATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateTournament;

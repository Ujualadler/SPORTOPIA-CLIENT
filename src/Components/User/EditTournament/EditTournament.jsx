import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const EditTournament = () => {
  const clubId = useSelector((state) => state.Club.clubId);
  const [tournamentName, setTournamentName] = useState("");
  const [sportsType, setSportsType] = useState("");
  const [description, setDescription] = useState("");
  const [maximumTeams, setMaximumTeams] = useState("");
  const [detailedDocument, setDetailedDocument] = useState("");
  const [tournamentData, setTournamentData] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const userAxios = UserAxios();
  const pdf = useRef();

  const successToast = (msg) => {
    toast.success(msg);
  };

  const errorToast = (msg) => {
    toast.error(msg);
  };

  useEffect(() => {
    const getData = async (req, res) => {
      try {
        const res = await userAxios.get(
          `/getTournamentDetails?id=${id}&clubId=${clubId}`
        );
        console.log(res.data.data, "response available");
        if (res.data.data) {
          setTournamentData(res.data.data);
          setDetailedDocument(res.data.data.detailedDocument);
          setDescription(res.data.data.description);
          setMaximumTeams(res.data.data.maximumTeams);
          setSportsType(res.data.data.sportsType);
          setTournamentName(res.data.data.tournamentName);
        }
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
    };
    getData();
  }, []);

  const uploadFile = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /\.(pdf)$/i; // Only allow PDF files
    if (!allowedExtensions.test(file.name)) {
      toast.error("Invalid file format. Only PDF files are allowed.");
      return;
    }
    setDetailedDocument(file);
  };

  const editTournament = async (e) => {
    e.preventDefault();
    const tournaments=(role)=>{
      navigate(`/yourTournaments/${role}`)
    }
    const generateError = (err) => toast.error(err);

    if (
      !tournamentName.trim() ||
      !sportsType.trim() ||
      !description.trim() ||
      !maximumTeams.toString().trim() ||
      !detailedDocument
    ) {
      generateError("Please fill in all the fields");
      return;
    }
    userAxios
      .post(
        `/editTournament?id=${id}`,
        {
          tournamentName,
          sportsType,
          description,
          detailedDocument,
          maximumTeams,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          successToast("Tournament Successfully edited");
          tournaments('admin')
        } else {
          errorToast(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      });
  };

  return (
    <form className="h-full" onSubmit={editTournament}>
      <div className=" block md:flex md:ml-12 md:mr-12 ">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 mb-2  border border-gray-700 bg-gray-900 bg-opacity-60 shadow-2xl">
          <div className="flex justify-between">
            <span className="text-xl font-semibold font-heading text-white uppercase md:tracking-widest block">
              EDIT TOURNAMENT
            </span>
          </div>
          <div className="w-full  flex justify-center">
            <div className="flex-col">
              <div className="mt-5 text-center">
                <div className="pdf-container md:w-[25rem] mb-2">
                  {detailedDocument && (
                    <iframe
                      src={
                        detailedDocument instanceof File
                          ? URL.createObjectURL(detailedDocument)
                          : detailedDocument
                      }
                      title="PDF Viewer"
                      width="100%"
                      height="300"
                      frameBorder="0"
                    />
                  )}
                </div>
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

        <div className="w-full md:w-3/5 p-4  border mb-2   border-gray-700 bg-gray-900 bg-opacity-60 lg:ml-4 shadow-2xl">
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
                  defaultValue={tournamentData?.tournamentName}
                  placeholder="Enter tournament name"
                  onChange={(e) => {
                    setTournamentName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Sports type
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full"
                  type="text"
                  defaultValue={tournamentData?.sportsType}
                  placeholder="Enter sports type"
                  onChange={(e) => {
                    setSportsType(e.target.value);
                  }}
                />
              </div>
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
                  defaultValue={tournamentData?.description}
                  placeholder="Enter description of the tournament"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Maximum number of teams
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full  break-word"
                  type="number"
                  defaultValue={tournamentData?.maximumTeams}
                  placeholder="Enter maximum no of teams allowed"
                  onChange={(e) => {
                    setMaximumTeams(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* <div className="pb-2">
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
                  defaultValue={tournamentData?.startingDate}
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
                  className="border border-gray-400 rounded-r px-4 py-2 w-full break-word"
                  type="date"
                  min={getMinDate()}
                  defaultValue={tournamentData?.startingDate}
                  placeholder="Enter starting date of the tournament"
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
                  defaultValue={tournamentData?.startingTime}
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
                  defaultValue={tournamentData?.endingTime}
                  placeholder="Enter ending time of the tournament"
                  onChange={(e) => {
                    setEndingTime(e.target.value);
                  }}
                />
              </div>
            </div> */}

            <div className="mt-5 text-center">
              <button
                type="submit"
                className="rounded hover:rounded-lg bg-black w-[8.5rem] h-[2rem] hover:bg-slate-900 text-white"
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditTournament;

import React, { useEffect, useRef, useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AddWinners from "./AddWinners";
import MatchForm from "./MatchForm";

function AddFixture() {
  const userAxios = UserAxios();
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [matchName, setMatchName] = useState("");
  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [change, setChange] = useState(false);
  const [show, setShow] = useState(false);
  const [tournament, setTournament] = useState("");
  const navigate = useNavigate();

  const addGame = async (e) => {
    try {
      e.preventDefault();
      if (
        !matchName ||
        !matchName.trim() ||
        !teamOne ||
        !teamTwo ||
        !time ||
        !date
      ) {
        toast.error("Fill all the fields");
        return;
      }
      const response = await userAxios.post(`/addGame`, {
        id,
        matchName,
        teamOne,
        teamTwo,
        time,
        date,
      });
      if (response) {
        console.log(response.data);
        if (response.data.status === true) {
          setMatches(response.data.updatedTournament);
          setChange(true);
          setDate("");
          setMatchName("");
          setTeamOne("");
          setTeamTwo(null);
          setTime("");
          toast.success("GAME CREATED SUCCESSFULLY");
        }
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAxios.get(`findMatches?id=${id}`);
        if (response.data) {
          setMatches(response.data.matches);
          setTournament(response.data.tournament);
          setClubs(response.data.clubs);
        }
      } catch (error) {
        console.error(error);
        navigate("/error");
      }
    };

    fetchData();
  }, [change]);

  return (
    <div className=" bg-gray-800  m-1 min-h-screen ">
      {show ? (
        <AddWinners show={setShow} clubs={clubs} id={id} />
      ) : (
        <>
          <div className="flex justify-center bg-black bg-opacity-60 mb-10 ">
            <div className="mt-2 mb-2 mx-3   md:text-xl text-white font-bold tracking-wide">
              TOURNAMENT FIXTURE
            </div>
          </div>
          <div className="flex justify-between m-4 ">
            <div className="mt-4 ml-2 md:text-xl text-white font-bold tracking-wide">
              ADD GAMES
            </div>
            <button
              onClick={() => setShow(true)}
              className="mt-4 bg-black p-2 rounded-md  md:mr-2 md:text-md text-white font-bold tracking-wide"
            >
              ADD WINNERS
            </button>
          </div>
          <form onSubmit={addGame} className=" ">
            <div className="grid grid-cols-12 mb-6 md:m-10 ">
              <div className="text-center col-span-12">
                <input
                  className="font-bold text-lg text-center rounded-md"
                  type="text"
                  defaultValue={matchName}
                  onChange={(e) => setMatchName(e.target.value)}
                  placeholder=" ENTER MATCH NAME"
                />
              </div>

              <div className="col-span-12 grid grid-cols-12 m-2 bg-black bg-opacity-40 ">
                <div className="flex flex-col sm:col-span-5 col-span-6 m-2">
                  <select
                    className="md:m-1 p-2 text-sm sm:text-base text-center w-full rounded-sm"
                    onChange={(e) => setTeamOne(e.target.value)}
                    defaultValue={teamOne}
                  >
                    <option value="">Select a club</option>
                    {clubs.length
                      ? clubs
                          .filter((club) => club._id !== teamTwo)
                          .map((club) => (
                            <option key={club?.id} value={club?._id}>
                              {club?.clubName}
                            </option>
                          ))
                      : ""}
                  </select>
                  <div className="flex text-sm sm:text-base w-full flex-col">
                    <label
                      className="text-white ml-2 rounded-sm"
                      htmlFor="dateInput"
                    >
                      DATE
                    </label>
                    <input
                      min={
                        tournament ? tournament.startingDate.split("T")[0] : ""
                      }
                      max={
                        tournament ? tournament.endingDate.split("T")[0] : ""
                      }
                      defaultValue={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="sm:m-1 p-2  w-full text-center"
                      type="date"
                      id="dateInput"
                    />
                  </div>
                </div>
                <div className="col-span-2 hidden  sm:flex justify-center items-center">
                  <div className="text-white md:text-2xl text-xl font-extrabold">
                    VS
                  </div>
                </div>
                <div className="flex flex-col sm:col-span-5 col-span-6 m-2">
                  <select
                    className="sm:m-1 p-2 text-center text-sm sm:text-base rounded-sm"
                    onChange={(e) => setTeamTwo(e.target.value)}
                    defaultValue={teamTwo}
                  >
                    <option value="">Select a club</option>
                    {clubs.length
                      ? clubs
                          .filter((club) => club?.clubName !== teamOne)
                          .map((club) => (
                            <option key={club?.id} value={club?._id}>
                              {club?.clubName}
                            </option>
                          ))
                      : ""}
                  </select>
                  <div className="flex text-sm sm:text-base w-full flex-col">
                    <label className="text-white ml-2">TIME</label>
                    <input
                      onChange={(e) => setTime(e.target.value)}
                      defaultValue={time}
                      className="sm:m-1 p-2 text-center w-full rounded-sm"
                      type="time"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center col-span-12">
                <button
                  type="submit"
                  className="font-bold text-white text-lg text-center bg-red-900 w-[7rem] md:h-[2rem] rounded-sm"
                >
                  SAVE
                </button>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <div className="mt-4 md:mr-2 md:text-xl text-white font-bold tracking-wide">
              MANAGE GAMES
            </div>
          </div>
          <div className="overflow-x-scroll mt-1 pt-1 bg-black bg-opacity-20 h-[600px]">
            {matches.length ? (
              matches.map((match) => (
                <MatchForm
                  key={match?._id}
                  match={match}
                  clubs={clubs}
                  id={id}
                  setMatches={setMatches}
                  setChange={setChange}
                  tournament={tournament}
                />
              ))
            ) : (
              <div className="flex justify-center   ">
                <div className="mt-4 md:mr-2 md:text-xl text-gray-500 font-bold tracking-wide">
                  NO MATCHES AVAILABLE
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AddFixture;

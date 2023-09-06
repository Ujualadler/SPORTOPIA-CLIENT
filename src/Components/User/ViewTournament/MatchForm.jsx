import React, { useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function MatchForm({match, clubs,tournament,id,setMatches,setChange }) {
  const userAxios = UserAxios();
  const navigate=useNavigate()
  const [matchName, setMatchName] = useState(match?.matchName);
  const [teamOne, setTeamOne] = useState(match?.teamOne._id);
  const [teamTwo, setTeamTwo] = useState(match?.teamTwo._id);
  const [scoreOne, setScoreOne] = useState(match?.scoreOne);
  const [scoreTwo, setScoreTwo] = useState(match?.scoreTwo);
  const [winner, setWinner] = useState(match?.winner);
  const [time, setTime] = useState(match?.time);
  const [matchId, setMatchId] = useState(match?._id);
  const [date, setDate] = useState(match?.date.split("T")[0]);

  const editGame = async (e) => {
    try {
      e.preventDefault()
      if (
        !matchName ||
        !matchName.trim() ||
        !teamOne ||
        !teamTwo ||
        !time ||
        !date
      ) {
        setTimeout(() => {
          toast.error("Fill all the fields");
        }, 1000 );
  
        return;
      }
  
      const response = await userAxios.post(`/editGame`, {
        id,
        matchId,
        matchName,
        teamOne,
        teamTwo,
        scoreOne,
        scoreTwo,
        winner,
        time,
        date,
      });
  
      if (response) {
        if (response.data.message) {
          toast(response.data.message);
        }
        if (response.data.status === true) {
          setMatches(response.data.updatedTournament);
          setChange(true);
          toast.success("GAME UPDATED SUCCESSFULLY");
        }
      }
    } catch (error) {
      console.log(error);
      navigate('/error');
    }
  };

  const deleteGame = async (matchId) => {
    try {
      const response = await userAxios.post("/deleteGame", { id, matchId });
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this match!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "REMOVE",
      }).then((result) => {
        if (result.isConfirmed && response.data.status === true) {
          Swal.fire("Successfully removed");
          setMatches(response.data.updatedTournament);
          setChange(true);
        }
      });
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };


  return (
    <div>
      <form
        className=""
        onSubmit={editGame}
      >
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
            <div className="flex flex-col col-span-6  lg:col-span-5 m-2">
              <select
                className="m-1 p-3 text-center rounded-sm"
                onChange={(e) => setTeamOne(e.target.value)}
                defaultValue={teamOne}
              >
                <option value="">{match?.teamOne?.clubName}</option>
                {clubs.length
                  ? clubs
                      .filter(
                        (club) => club._id !== match?.teamOne?._id || teamOne
                      )
                      .map((club) => (
                        <option key={club.id} value={club._id}>
                          {club.clubName}
                        </option>
                      ))
                  : ""}
              </select>
              <div className="flex flex-col md:col-span-1 col-span-2">
                <label className="text-white text ml-2" htmlFor="">
                  DATE
                </label>
                <input
                  min={tournament ? tournament.startingDate.split("T")[0] : ""}
                  max={tournament ? tournament.endingDate.split("T")[0] : ""}
                  onChange={(e) => setDate(e.target.value)}
                  defaultValue={date}
                  className="m-1 p-1 text-center "
                  type="date"
                />
              </div>
            </div>
            <div className="col-span-2 lg:flex flex-col hidden  justify-center items-center">
              <div className="text-xl font-bold mb-2 text-white">SCORE</div>
              <div className="flex justify-center  ">
                <div>
                  <input
                    defaultValue={scoreOne}
                    onChange={(e) => setScoreOne(e.target.value)}
                    className="w-14 h-10 p-2"
                    type="text"
                  />
                </div>
                <div className="m-1 text-white text-2xl font-extrabold">:</div>
                <div>
                  <input
                    defaultValue={scoreTwo}
                    onChange={(e) => setScoreTwo(e.target.value)}
                    className="w-14 h-10 p-2 font-lg"
                    type="text"
                  />
                </div>
              </div>
              <div className="text-md font-semibold mt-2 ">
                <select
                  className="m-1  py-2 outline-none text-center rounded-sm"
                  onChange={(e) => setWinner(e.target.value)}
                  defaultValue={winner}
                >
                  <option value="">SELECT WINNER</option>
                  {clubs.length
                    ? clubs.map((club) => (
                        <option key={club.id} value={club.clubName}>
                          {club.clubName}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
            </div>
            <div className="flex flex-col col-span-6  lg:col-span-5 m-2">
              <select
                className="m-1 p-3 text-center rounded-sm"
                onChange={(e) => setTeamTwo(e.target.value)}
                value={teamTwo}
              >
                <option value="">{match?.teamTwo?.clubName}</option>
                {clubs.length
                  ? clubs
                      .filter(
                        (club) => club._id !== match?.teamTwo?._id || teamOne
                      )
                      .map((club) => (
                        <option key={club.id} value={club._id}>
                          {club.clubName}
                        </option>
                      ))
                  : ""}
              </select>
              <div className="flex flex-col md:col-span-1 col-span-2 ">
                <label className="text-white ml-2" htmlFor="">
                  TIME
                </label>
                <input
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                  className="m-1 p-1 text-center  rounded-sm"
                  type="time"
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 mb-1 flex flex-col lg:hidden  justify-center items-center">
              <div className="text-xl font-bold mb-2 text-white">SCORE</div>
              <div className="flex justify-center ">
                <div>
                  <input
                    defaultValue={scoreOne}
                    onChange={(e) => setScoreOne(e.target.value)}
                    className="w-20 h-10 p-2 text-center"
                    type="text"
                  />
                </div>
                <div className="m-1 text-white text-2xl font-extrabold">:</div>
                <div>
                  <input
                    defaultValue={scoreTwo}
                    onChange={(e) => setScoreTwo(e.target.value)}
                    className="w-20 h-10 p-2 text-center font-lg"
                    type="text"
                  />
                </div>
              </div>
              <div className="text-md font-semibold mt-2 ">
                <select
                  className="m-1  py-2 outline-none text-center rounded-sm"
                  onChange={(e) => setWinner(e.target.value)}
                  defaultValue={winner}
                >
                  <option value="">SELECT WINNER</option>
                  {clubs.length
                    ? clubs.map((club) => (
                        <option key={club.id} value={club.clubName}>
                          {club.clubName}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
            </div>
          <div className="flex justify-center col-span-12">
            <button
            type="button"
              onClick={(e) => deleteGame(match._id)}
              className="font-bold mr-1 text-white text-lg text-center bg-red-900 w-[7rem] md:h-[2rem] rounded-sm"
            >
              DELETE
            </button>
            <button
              type="submit"
              className="font-bold mr-1 text-white text-lg text-center bg-red-900 w-[7rem] md:h-[2rem] rounded-sm"
            >
              EDIT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MatchForm;

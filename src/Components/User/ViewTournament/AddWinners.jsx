import React, { useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddWinners({ show,clubs,id }) {
  const userAxios = UserAxios();

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const navigate=useNavigate()

  const champions = async (e) => {
    try {
      e.preventDefault();
      if (
        !first ||
        !second
       
      ) {
        toast.error("Fill in all the fields");
        return;
      }
      const response = await userAxios.post(`/addWinners`, {
        id,
        first,
        second,
      });
      if (response) {
        if (response.data.status === true) {
          navigate(`/viewTournament/:${id}`)
          toast.success("WINNERS ANNOUNCED");
        }
      }
    } catch (error) {
      console.log(error);
      navigate('/error')
    }
  };

  return (
    <>
      <div className="text-right">
        <button
          onClick={() => show(false)}
          className="mt-4 bg-red-700 p-2 mx-auto w-12 first-letter rounded-sm mr-auto  md:mr-2 md:text-2xl text-white font-bold tracking-wide"
        >
          X
        </button>
      </div>

      <div className=" flex flex-col justify-center items-center h-screen ">
        <form onSubmit={champions} className="grid grid-cols-1 w-96 bg-black bg-opacity-40 p-5">
          <select
            className="m-1 p-3 text-center font-semibold rounded-sm"
            onChange={(e) => setFirst(e.target.value)}
            defaultValue={first}
          >
            <option value="">SELECT CHAMPIONS</option>
            {clubs.length
              ? clubs
                  .filter((club) => club._id !== second)
                  .map((club) => (
                    <option key={club.id} value={club._id}>
                      {club.clubName}
                    </option>
                  ))
              : ""}
          </select>
          <select
            className="m-1 p-3 text-center font-semibold  rounded-sm"
            onChange={(e) => setSecond(e.target.value)}
            defaultValue={second}
          >
            <option value="">SELECT RUNNER UP</option>
            {clubs.length
              ? clubs
                  .filter((club) => club._id !== first)
                  .map((club) => (
                    <option key={club.id} value={club._id}>
                      {club.clubName}
                    </option>
                  ))
              : ""}
          </select>
          <button type="submit" className="m-1 text-center text-white font-semibold col-span-1 bg-red-800 p-3 hover:bg-red-500">SAVE</button>
        </form>
      </div>
    </>
  );
}

export default AddWinners;

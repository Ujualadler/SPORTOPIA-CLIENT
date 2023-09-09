import React, { useEffect, useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function AddWinners({ show, clubs, id }) {
  const userAxios = UserAxios();

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [winner, setWinner] = useState("");
  const [change, setChange] = useState(false);
  
  const navigate = useNavigate();

  const champions = async (e) => {
    try {
      e.preventDefault();
      if (!first || !second) {
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
          setChange(true)
          toast.success("WINNERS ANNOUNCED");
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
        const response = await userAxios.get(`findWinners?id=${id}`);
        if (response.data) {
          setWinner(response?.data?.winner);
        }
      } catch (error) {
        console.error(error);
        navigate("/error");
      }
    };

    fetchData();
  }, [change]);

  const deleteWinners = async (winnerId) => {
    try {
      const response = await userAxios.post(`deleteWinners?id=${id}`,{winnerId});
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this winners!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "REMOVE",
      }).then((result) => {
        if (result.isConfirmed && response?.data?.status === true) {
          Swal.fire("Successfully removed");
          setChange(true);
        }
      });
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <>
      <div className="text-right">
        <button
          onClick={() => show(false)}
          className="mt-4 bg-red-700 p-2  mx-auto w-12 first-letter rounded-sm  mr-2  md:mr-2 md:text-2xl text-white font-bold tracking-wide"
        >
          X
        </button>
      </div>

      <div className=" flex flex-col justify-center m-4 md:m-0 items-center sm:h-screen h-[500px]">
      {winner.length?
      <>
       <div className="text-center text-white font-semibold">REMOVE THIS WINNER TO ADD NEW ONE</div>
        <div className=" flex mt-5 flex-col text-white sm:w-96 w-80 bg-black bg-opacity-40 ">
        <div className="m-1 p-3 text-center bg-gray-950 font-semibold  rounded-sm">
        CHAMPION-  {winner[0]?.first.clubName}
        </div>
        <div className="m-1  p-3 text-center font-semibold bg-gray-950 rounded-sm">
          RUNNER UP- {winner[0]?.second.clubName}
        </div>
        <button onClick={()=>deleteWinners(winner[0]._id)} className="m-1  text-center text-white font-semibold col-span-1 bg-red-800 p-3 hover:bg-red-500">
          REMOVE
        </button>
      </div></>:<form
          onSubmit={champions}
          className=" flex flex-col sm:w-96 w-80 bg-black bg-opacity-40 "
        >
          <select
            className="m-1 p-3 text-center  font-semibold rounded-sm"
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
          <button
            type="submit"
            className="m-1  text-center text-white font-semibold col-span-1 bg-red-800 p-3 hover:bg-red-500"
          >
            SAVE
          </button>
        </form>}
      </div>
    </>
  );
}

export default AddWinners;

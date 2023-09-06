import React from "react";
import Useraxios from "../../../Axios/userAxios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserClubId,setClubId } from "../../../Redux/Slices/clubAuth";

function ClubHome() {
  const userAxios = Useraxios();
  const [memberData, setMemberData] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    userAxios
      .get(`/getMembers?id=${id}`)
      .then((response) => {
        console.log(response.data.user);
        setMemberData(response.data.user);
        dispatch(setClubId({clubId:id}));
        dispatch(setUserClubId({userClubId:id}));
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      });
  }, []);

  console.log(id)

  const accept = async (status, userId) => {
    try {
      const response = await userAxios.post("/acceptMember", {
        userId,
        status,
        id,
      });
      if (response.data.status === "accepted") {
        setStatus(true);
        toast.success("REQUEST ACCEPTED");
      } else {
        setStatus(true);
        toast.success("REQUEST REJECTED");
      }
    } catch (error) {
      console.log(error);
      navigate('/error')
    }
  };

  const members = () => {
    navigate(`/members/${id}`);
  };

  return (
    <>
      <div className="flex justify-between mx-2 md:mx-5">
        <div className="mt-2 font-bold text-xl font-heading text-white uppercase md:tracking-widest ">
          REQUESTS
        </div>
        <div>
          <button
            onClick={members}
            className="text-lg font-bold font-heading text-white uppercase md:tracking-widest rounded-md bg-black w-[7rem] h-[3rem]"
          >
            MEMBERS
          </button>
        </div>
      </div>
      {memberData.length ? (
        memberData.map((data) => (
          <div
            className="max-w-full bg-gray-900 bg-opacity-60 mt-10 m-4"
            key={data._id}
          >
            <div className="p-3 flex flex-col items-center md:flex-row md:justify-around  shadow-2xl border-t border-gray-600 cursor-pointer">
              <div className="flex items-center mb-2">
                <img
                  className="rounded-full md:ml-8 h-28 w-28"
                  src={data.user.image}
                  alt="Profile"
                />
                <div className="md:ml-12 ml-4 flex flex-col"></div>
              </div>
              <div className=" text-xl mt-1 mb-1 text-white font-bold">
                {data.user.name}
              </div>
              <div className=" text-xl hidden mt-1 md:block text-white font-bold">
                {data.user.email}
              </div>
              <div className="md:mr-8 mt-2">
                {data.status == "pending" ? (
                  <>
                    <button
                      onClick={() => accept(true, data.user._id)}
                      className="h-8 px-3 text-md mr-2 font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                    >
                      ACCEPT
                    </button>
                    <button
                      onClick={() => accept(false, data.user._id)}
                      className="h-8 px-3 text-md mr-2 font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                    >
                      REJECT
                    </button>
                  </>
                ) : (
                  <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
                    VIEW
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl font-bold font-heading text-white uppercase md:tracking-widest">
            NO REQUESTS
          </div>
        </div>
      )}
    </>
  );
}

export default ClubHome;

import React from "react";
import Useraxios from "../../../Axios/userAxios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function ClubMembers() {
  const userAxios = Useraxios();
  const [memberData, setMemberData] = useState([]);
  const [status, setStatus] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    userAxios
      .get(`/clubMembers?id=${id}`)
      .then((response) => {
        console.log(response.data.user);
        setMemberData(response.data.user);
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      });
  }, [status]);

  const remove = async (userId) => {
    try {
      const response = await userAxios.post("/removeMember", { userId, id });
      if (response.data.status === "removed") {
        setStatus(true)
        toast.success("USER REMOVED");
      }
    } catch (error) {
      console.log(error);
      navigate('/error')
    }
  };

  return (
    <>
      <div className="flex justify-center md:justify-start md:ml-5 md:mr-5">
        <div className="mt-2 font-bold text-xl font-heading text-white uppercase md:tracking-widest">
          CLUB MEMBERS
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
                  src={data.user.image?data.user.image:'https://as1.ftcdn.net/v2/jpg/02/09/95/42/1000_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.jpg'}
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
                <button
                  onClick={() => remove(data.user._id)}
                  className="h-8 px-3 text-md mr-2 font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                >
                  REMOVE
                </button>
                {/* <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
                  VIEW
                </button> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center mt-36 h-screen">
          <div className="text-xl font-bold">NO MEMBERS AVAILABLE</div>
        </div>
      )}
    </>
  );
}

export default ClubMembers;

import React, { useState } from "react";
import { useEffect } from "react";
import Useraxios from "../../../Axios/userAxios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserClubId } from "../../../Redux/Slices/clubAuth";


function ClubUserHome() {
  const userAxios = Useraxios();
  const [clubData, setClubData] = useState([]);
  const { id } = useParams();
  console.log(id+'userclubid')
  const dispatch = useDispatch();
  const clubId = useSelector((state) => state.Club.clubId);


    useEffect(() => {
      const clubData = async () => {
        try {
          const response =await userAxios.post("/clubDetails",{id});
          if (response) {
            setClubData(response.data.data)
            dispatch(setUserClubId({userClubId:id})); 
            console.log(response.data+'sdghjkfghk');
          }
        } catch (error) {
          console.log(error);
          navigate('/error')
        }
      };

      clubData();
    }, []);

  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-2 mr-2 ml-2">
        <div class="bg-gray-900 bg-opacity-70 flex justify-center p-2 items-center">
          <a href="/blog/my-third-big-post/">
            <img
              src={clubData.backgroundImage}
              class="w-full max-w-md"
            />
          </a>
        </div>
        <div class="md:order-first bg-gray-900 bg-opacity-70 p-5 md:p-12  flex justify-end items-center">
          <div class="max-w-md md:mr-10">
            <h2 class="font-display font-bold text-2xl text-white md:text-2xl lg:text-3xl mb-6">
              {clubData.clubName}
            </h2>
            <div class=" md:w-96  h-2 bg-black mb-4"></div>
            <p class="font-light  text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
              {clubData.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubUserHome;

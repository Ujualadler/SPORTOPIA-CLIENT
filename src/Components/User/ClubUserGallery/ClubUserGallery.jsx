import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Useraxios from "../../../Axios/userAxios";
import { ClipLoader } from "react-spinners";

function ClubUserGallery() {
  const userAxios = Useraxios();
  const clubId = useSelector((state) => state.Club.userClubId);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const getGallery = async () => {
        const response = await userAxios.post("clubUserDetails", { clubId });
        if (response) {
          setGallery(response.data.gallery);
          setLoading(false); // Set loading to false after the API call completes
        }
      };
      getGallery();
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }, []);

  return (
    <>
      <div className="flex justify-center md:justify-start m-5 gap-12">
        <h2 className="text-xl font-bold text-gray-200 lg:text-2xl">
          CLUB GALLERY
        </h2>
      </div>
      <div className="bg-gray-900 m-2 p-2 bg-opacity-60  grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <div className="flex justify-center mt-40 h-80">
            <ClipLoader color="#ffffff" loading={loading} size={150} />
          </div>
        ) : gallery.length ? (
          gallery.map((value) => {
            return (
              <div className="mx-auto w-full px-4 md:px-8  col-span-1">
                <div className="col-span-1 md:col-span-1/3">
                  {/* image - start */}
                  <a className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-60">
                    <img
                      src={value.image}
                      loading="lazy"
                      alt="Photo by Minh Pham"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
                  </a>
                  {/* image - end */}
                </div>
                <div className="mt-2 flex items-center justify-center ">
                  <div className="w-full h-14 bg-black text-center text-white flex items-center justify-center  bg-opacity-70 rounded-md md:w-[99%]">
                    {value.content}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center mt-36 h-screen">
            <div className="mt-8 mx-11 hidden md:block text-white md:text-xl font-bold tracking-wide">
              EMPTY GALLERY
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ClubUserGallery;

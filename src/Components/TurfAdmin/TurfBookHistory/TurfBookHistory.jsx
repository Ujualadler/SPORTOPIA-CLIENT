import React from "react";
import { useEffect, useState } from "react";
import TurfAxios from "../../../Axios/turfAxios";
import { useSelector } from "react-redux";

const TurfBookhistory = () => {
  const turfAxios = TurfAxios();
  const [details, setDetails] = useState();

  useEffect(() => {
    turfAxios.get("/TurfBookingHistory").then((response) => {
      const data = response.data.history;
      setDetails(data);
    }).catch((err) => {
      console.log(err);
      navigate('/turf/error')
    });
  }, []);

  return (
    <div className=" py-14 px-4 md:px-8 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-2xl lg:text-3xl font-semibold leading-7 lg:leading-9 ml-4 text-gray-100">
          BOOKING HISTORY
        </h1>
      </div>
      {details
        ? details.map((data) => {
            return (
              <div className="mt-10 flex bg-gray-900 bg-opacity-60 shadow-2xl flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                  <div className="flex flex-col justify-start items-startpx-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
                      <div className="w-full md:w-40 flex justify-center">
                        <img
                          className="w-full hidden md:block"
                          src={data.turf.logo}
                          alt="dress"
                        />
                        <img
                          className="w-40 md:hidden"
                          src={data.turf.logo}
                          alt="dress"
                        />
                      </div>
                      <div className=" m-2 flex justify-between w-full flex-col md:flex-row space-y-4 md:space-y-0 ">
                        <div className="w-full flex flex-col justify-center items-center md:items-start md:space-y-8 space-y-4">
                          <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-white">
                            {data.turf.turfName}
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm leading-none text-gray-100">
                              <span className="text-gray-400">
                                Booked slots:{" "}
                              </span>
                              {data.bookedSlots}
                            </p>
                            <p className="text-sm leading-none text-gray-100">
                              <span className="text-gray-400">Date: </span>
                              {data.bookedDate.split("T")[0]}
                            </p>
                            <p className="text-sm leading-none text-gray-100">
                              <span className="text-gray-400">
                                User Number:
                              </span>{" "}
                              {data.user.contactNumber}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-around md:mr-16    w-full">
                          <p className="text-base xl:text-lg leading-6">
                            <span className="text-gray-400  font-bold">
                              Name:{" "}
                            </span>{" "}
                            <span className="text-red-500  ">
                              {data.user.name}
                            </span>
                          </p>
                          <p className="text-base xl:text-lg leading-6 hidden md:block text-gray-200 font-bold">
                            <span className="text-gray-400">
                              Total amount:{" "}
                            </span>
                            ₹{data.totalAmount}
                          </p>
                          <p className="text-base xl:text-lg leading-6 text-gray-200 font-bold">
                            <span className="text-slate-400">
                              Advance amount:{" "}
                            </span>
                            ₹{data.totalAdvance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default TurfBookhistory;

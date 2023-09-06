import React from "react";
import { useEffect,useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import AddReview from "../AddReview/AddReview";


const Bookinghistory = () => {

const userAxios=UserAxios()    

const[details,setDetails]=useState()
const[review,setReview]=useState(false)
const[selectedTurfId,setSelectedTurfId]=useState(false)

    useEffect(()=>{
        console.log("first")
        userAxios.get('/bookingHistory').then((response)=>{
            const data=response.data.history
            setDetails(data)
          }).catch((err)=>{
            navigate('/error')
            console.log(err)
          })


    },[])

    const openReview = (id) => {
        if (review) {
          setReview(false);
          setSelectedTurfId(null); 
        } else {
          setReview(true);
          setSelectedTurfId(id);
        }
      };
    

    return (
        <div className="py-14  md:px-8 2xl:px-20 2xl:container 2xl:mx-auto">
            <div className="flex justify-start item-start space-y-2 flex-col ">
                <h1 className="text-2xl lg:text-3xl font-semibold leading-7 lg:leading-9 ml-4 text-white">BOOKING HISTORY</h1>
            </div>
            {review&&selectedTurfId!==null?<div >
                <div className="flex justify-end">
                    <button onClick={openReview} className="text-black bg-white font-bold w-20">CLOSE</button>
                </div>
                <AddReview turf={selectedTurfId}/>
                </div>:''}
            {details?details.map((data)=>{return( <div className="mt-10 flex shadow-2xl flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-900 bg-opacity-70  py-4 md:py-6 md:p-6 xl:p-8 w-full">
                     
                        <div className="mt-6 md:mt-0 flex md:justify-start flex-col md:flex-row  md:items-start  space-y-4  md:space-x-6 xl:space-x-8 w-full ">
                            <div className="w-full md:w-40 flex justify-center">
                                <img className="w-full hidden md:block drop-shadow-lg" src={data.turf.logo} alt="dress" />
                                <img className="w-40 md:hidden" src={data.turf.logo} alt="dress" />
                            </div>
                            <div className="  flex  md:items-start  w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                                
                                <div className=" w-full md:w-80  flex flex-col space-y-8">
                                    <h3 className="text-xl text-center md:text-left xl:text-2xl font-semibold leading-6 text-white">{data.turf.turfName}</h3>
                                    <div className="flex md:justify-start justify-center items-center md:items-start flex-col space-y-2">
                                        <h3 className="text-sm text-center leading-6 text-gray-400">
                                            <span className="text-gray-200 text-center font-semibold">Booked slots: </span>{data.bookedSlots}
                                        </h3>
                                        <h3 className="text-sm leading-6 text-gray-400">
                                            <span className="text-gray-200 font-semibold">Turf Number</span> {data.turf.phone}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex md:justify-between  md:items-start  w-full flex-col justify-center items-center md:flex-row space-y-4 md:space-x-8 md:space-y-0">
                                    <p className="text-base xl:text-lg leading-6 mt-1">
                                    <span className=" text-gray-200 mt-1 font-bold">Total:</span> <span className=" text-red-700 font-bold">₹{data.totalAmount}</span>
                                    </p>
                                    <p className="text-base xl:text-lg leading-6 mt-1  text-red-700 font-bold"><span className="text-gray-200">Date:</span>{data.bookedDate.split("T")[0]}</p>
                                    <p className="text-base xl:text-lg leading-6 mt-1 text-red-700 font-bold"><span className="text-slate-200">Advance amount:</span>₹{data.totalAdvance}</p>
                                    <div className="flex justify-center items-center">
                                    <p onClick={()=>openReview(data.turf._id)} className="text-base text-center h-[1.8rem] xl:text-lg mt-6 w-[6rem] md:mr-2  bg-black md:mt-1 leading-6 text-white hover:text-red-700 font-bold">REVIEW</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       
            </div>)}):''}
           
        </div>
    );
};

export default Bookinghistory;

import React, { useState } from "react";

const Review = (review) => {
    const data=review.review.reviews
    
    return (
        data?data.map((doc)=>{return( <div key={data._id} className="py-8 px-4 md:px-3 2xl:px-0 2xl:container 2xl:mx-auto  items-center w-full">
        <div className="flex flex-col justify-start  space-y-3">
            <div className="flex justify-start items-start">
                <p className="text-xl lg:text-2xl font-bold ml-4 leading-7 font-poppins lg:leading-9 text-white">REVIEWS</p>
            </div>
            <div className=" flex justify-start items-start flex-col bg-gray-900 bg-opacity-60 p-6 border border-black shadow-2xl rounded-lg">
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex flex-row justify-between items-start">
                        <button  className="ml-4 md:hidden">
                            <svg  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 12.5L10 7.5L5 12.5" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="cursor-pointer mt-2 md:mt-0 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  star <=doc.rating? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" 
                  clipRule="evenodd"
                />
              </svg>
            ))}
                    </div>
                </div>
                {/* className={"md:block " + (menu1 ? "block" : "hidden")} */}
                <div >
                    <p className="mt-3 font-semibold leading-normal text-white w-full md:w-9/12 xl:w-5/6">{doc.description}</p>
                    <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                        <div>
                            <img className='w-20 h-20 rounded-full' src={doc.user.image} alt="girl-avatar" />
                        </div>
                        <div className="flex flex-col justify-start items-start space-y-2">
                            <p className="text-base font-medium leading-none text-gray-100">{doc.user.name}</p>
                            <p className="text-sm leading-none text-gray-100">{doc.createdAt.split("T")[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)}):''
       
    );
};

export default Review;


